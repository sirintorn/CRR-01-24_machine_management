import { Router } from "express";
import { FavoriteSchema } from "../models/m_favorites";
import { Machine, MachineSchema } from "../models/m_machines";
import { DTOFavorite } from "../dtos/dto_favorite";

export const XBackupRestoreRoutes = Router();

const path = '/backup-restore';

XBackupRestoreRoutes.route(path + '/:target_machine').put(async (req, res) => {
    try {
        const target_machine = req.params.target_machine;
        const backup = req.body;

        const db_version_id = backup.db_version_id;
        let favorites: DTOFavorite[] = backup.json_data.favorites ?? [];

        for (let i = 0; i < favorites.length; i++) {
            let item = favorites[i];
            item.machineId = target_machine;
        }

        /*
            UPDATE Machine default DBVersion
            DELETE related favorites
            CREATE favorites
            RETURN machine
            RETURN favorites 
        */

        
        const favSchema = new FavoriteSchema();
        const machineSchema = new MachineSchema();

        let machine: Machine = await machineSchema.get(target_machine);
        if(machine){
            machine.db_version_id = db_version_id;
            await machineSchema.update(target_machine, machine);

            await favSchema.deleteByMachine(target_machine);

            const rawFavs = DTOFavorite.convertFromArray(favorites);

            const favIds = await favSchema.createMultiple(rawFavs, true);
            for (let i = 0; i < favorites.length; i++) {
                let item = favorites[i];
                item.id = favIds[i].id;
            }
    
            res.status(200).send({
                machine: machine,
                favorites: favorites
            });
        }else{
            res.status(404).send();
        }
    } catch (error) {
        res.status(400).send(error);
    }
});