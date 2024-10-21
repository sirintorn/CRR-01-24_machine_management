import { Router } from "express";
import { DTOFavorite } from "../dtos/dto_favorite";
import { Favorite, FavoriteSchema } from "../models/m_favorites";
import { MDCAPI } from "../services/mdc";

export const FavoriteRoute = Router();

const path = '/favorite';

//FAVORITE
FavoriteRoute.route(path).post(async (req, res) => {
    try {
        const dto = req.body as DTOFavorite;

        const schema = new FavoriteSchema();
        const result = await schema.favorite(dto);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

//UNFAVORITE
FavoriteRoute.route(path + '/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;

        const schema = new FavoriteSchema();
        await schema.unfavorite(id);

        res.status(200).send();
    } catch (error) {
        res.status(400).send(error);
    }
});

//GET FAVS BY MACHINE & DB_VERSION
FavoriteRoute.route(path + '/by-machine/:machine_id/by-db-version/:db_version_id').get(async (req, res) => {
    try {
        const machine_id = req.params.machine_id;
        const db_version_id = req.params.db_version_id;

        const schema = new FavoriteSchema();
        const favs: Favorite[] = await schema.getByMachineAndDBVersion(machine_id, db_version_id);
        const result = DTOFavorite.parseFromArray(favs);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

//GET SHADES FROM FAV
FavoriteRoute.route(path + '/by-machine/:machine_id/by-db-version/:db_version_id/shades').get(async (req, res) => {
    try {
        const machine_id = req.params.machine_id;
        const db_version_id = req.params.db_version_id;

        const schema = new FavoriteSchema();
        const favs: Favorite[] = await schema.getByMachineAndDBVersion(machine_id, db_version_id);

        const formula_books = favs.filter(val => val.is_custom == false);
        const custom_formula = favs.filter(val => val.is_custom == true);

        let fb_arr: string[] = [];
        let cf_arr: string[] = [];

        for (let i = 0; i < formula_books.length; i++) {
            const element = formula_books[i];
            fb_arr.push(element.product_shade_id);
        }
        for (let k = 0; k < custom_formula.length; k++) {
            const element = custom_formula[k];
            cf_arr.push(element.product_shade_id);
        }

        const fb_result = await MDCAPI.getShadesWhereIdsIn(db_version_id, fb_arr);
        const cf_result = await MDCAPI.getCustomShadesWhereIdsIn(db_version_id, cf_arr);

        let result = {
            formula_book: fb_result,
            custom_formula: cf_result
        };

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});