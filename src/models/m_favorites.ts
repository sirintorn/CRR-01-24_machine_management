import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";
import { DTOFavorite } from "../dtos/dto_favorite";

export interface Favorite extends TableRecord{
    machine_id: any,
    db_version_id: any,
    product_shade_id: any,
    is_custom: boolean
}

export class FavoriteSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.Favorite);
    }

    favorite(dto: DTOFavorite): Promise<any>{
        let fav: Favorite = {
            machine_id: dto.machineId,
            db_version_id: dto.dbVersionId,
            product_shade_id: dto.productShadeId,
            is_custom: dto.isCustom
        };
        return super.create(fav, true);
    }

    unfavorite(id: any): Promise<any>{
        return super.forceDelete(id);
    }

    delete(id: any): Promise<any> {
        return super.forceDelete(id);
    }

    getByMachineAndDBVersion(machine_id: any, db_version_id: any): Promise<Favorite[]>{
        return new Promise((resolve, reject) => {
            const table = DB<Favorite>(this.tableName);
            table.select('*')
            .where('machine_id', machine_id)
            .where('db_version_id', db_version_id)
            .where('deleted_at', null)
            .then(vals => {
                resolve(vals);
            }).catch(error => {
                reject(error);
            });
        });
    }

    deleteByMachine(machine_id: any): Promise<any>{
        return new Promise((resolve, reject) => {
            const table = DB<Favorite>(this.tableName);
            table.delete()
            .where('machine_id', machine_id)
            .then(val => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }
}