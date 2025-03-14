import * as knex from "knex";
import * as knexFile from '../knexfile';
import { IDGenerator } from "../src/services/id_generator";

//env ==> "development", "staging". "production"
const environment = process.env.NODE_ENV || "development";

export const DB = knex.knex(knexFile.default[environment]);

export const TABLE_NAMES = {
    //คือการกำหนัดชื่อ Table ต่างๆ ที่ต้องการจะให้มีในฐานข้อมูล
    Users: "Users",
    Posts: "Posts",
    TintingProfile: "TintingProfile",
    // ที่เพิ่มเข้ามาใหม่
    CircuitInfo: "CircuitInfo",
    AccuracyTestTarget: "AccuracyTestTarget",
    CalibrationInfo: "CalibrationInfo",
    VolumeCalibrationTarget: "VolumeCalibrationTarget",
    StepCalibrationTarget: "StepCalibrationTarget",
    Machine: "Machine",
    Favorite: "Favorite",
    Licenses: "Licenses",
    Devices: "Devices",
    AccuracyTest: "AccuracyTest",
    Logs: "Logs"
}

export interface TableRecord{
    id?: any,
    created_by?: any,
    updated_by?: any,
    created_at?: any,
    updated_at?: any,
    deleted_by?: any,
    deleted_at?: any,
}

export class TableRecordsSchema{
    tableName: string = 'default';

    constructor(tableName: string){
        this.tableName = tableName;    
    }

    getAll(): Promise<any[]>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.select('*').where('deleted_at', null).then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    get(id: any): Promise<any>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            //if the record was marked as deleted. it wont be quried.
            table.select('*').where('id', id).where('deleted_at', null).then((val) => {
                if(val.length > 0)resolve(val[0]);
                else resolve(null);
            }).catch(error => {
                reject(error);
            });
        });
    }

    create(data: any, isNewId?: boolean): Promise<any>{
        if(isNewId){
            data.id = IDGenerator.newUUID();
        }
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            //insert data and ask to return id[]
            table.insert(data)
            .returning('*')
            .then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    createMultiple(datas: any[], isNewId?: boolean): Promise<any>{
        if(isNewId){
            datas.forEach((item) => item.id = IDGenerator.newUUID());
        }

        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            //insert data and ask to return id[]
            table.insert(datas)
            .returning('*')
            .then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        })
    }

    update(id: any, data: any): Promise<any>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.where('id', id).update(data)
            .returning('*')
            .then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    delete(id: any): Promise<any>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            //not an actual delete, just symbolically delete
            table.where('id', id).update({'deleted_at': DB.fn.now()}).then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    deleteMultiple(ids: any[]): Promise<any>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.whereIn('id', ids).update({'deleted_at': DB.fn.now()}).then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    restore(id: any): Promise<any>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            //not an actual restore, just symbolically restore
            table.where('id', id).update({'deleted_at': null, 'deleted_by': null}).then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    batchInsert(datas: any[], isNewId?: boolean): Promise<any[]>{
        if(isNewId){
            datas.forEach((item) => item.id = IDGenerator.newUUID());
        }
        return new Promise((resolve, reject) => {
            const chunkSize = 1000;
            DB.batchInsert(this.tableName, datas, chunkSize)
            .returning('*')
            .then((ids) => {
                resolve(ids);
            }).catch(error => {
                reject(error)
            });
        });
    }

    forceDelete(id: any): Promise<any>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.delete()
            .where('id', id)
            .then(val => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    forceDeleteClearTable(): Promise<any>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            //not an actual delete, just symbolically delete
            table.delete().then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }
}

//to generate new migration
// $ knex migrate:make migration_name -x ts