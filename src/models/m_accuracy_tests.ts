import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";

export interface AccuracyTest extends TableRecord{
    tinting_profile_id: any,
    index: number,
    tinter_code: string,
    tinter_name: string,
    target_ml: number,
    target_err_rate: number,
    repeat: number,
    result_step: number,
    result_ml: number,
    result_g: number,
    result_err_rate: number,
    status: string,
    created: any,
    modified: any
}

export class AccuracyTestSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.AccuracyTest);
    }

    getByTintingProfile(tinting_profile_id: any): Promise<any[]>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.select('*')
            .where('tinting_profile_id', tinting_profile_id)
            .where('deleted_at', null)
            .orderBy('index', 'asc')
            .then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    forceDeleteByTintingProfile(tinting_profile_id: any): Promise<any>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.delete()
            .where('tinting_profile_id', tinting_profile_id)
            .then(val => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }
}