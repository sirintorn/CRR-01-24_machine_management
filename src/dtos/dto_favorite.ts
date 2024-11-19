import { Favorite } from "../models/m_favorites";
import { DTO } from "./dto";

export class DTOFavorite extends DTO{
    id?: any;
    machineId: any;
    dbVersionId: any;
    productShadeId: any;
    isCustom: boolean;

    constructor(data: Favorite){
        super();
        this.id = data.id;
        this.machineId = data.machine_id;
        this.dbVersionId = data.db_version_id;
        this.productShadeId = data.product_shade_id;
        this.isCustom = data.is_custom;
    }

    static convertFromArray(dtos: DTOFavorite[]){
        let arr: Favorite[] = [];
        for (let i = 0; i < dtos.length; i++) {
            const item = dtos[i];
            let fav: Favorite = {
                id: item.id,
                machine_id: item.machineId,
                db_version_id: item.dbVersionId,
                product_shade_id: item.productShadeId,
                is_custom: item.isCustom
            };
            arr.push(fav);
        }
        return arr;
    }

    static parseFromArray(dtos: Favorite[]){
        let arr: DTOFavorite[] = [];
        for (let i = 0; i < dtos.length; i++) {
            let item = dtos[i];
            let fav = new DTOFavorite(item);
            arr.push(fav);
        }
        return arr;
    }
}