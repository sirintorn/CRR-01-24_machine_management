import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";

export interface Machine extends TableRecord{
    company_id: any,
    machine_serial_no: string,
    bluetooth_mac_address: string,
    bluetooth_no: string,
    tinting_profile_id?: any,
    db_version_id?: any,
    visible?: boolean,

    //coverage data
    device_limit: number,
    coverage_start_date: any,
    coverage_end_date: any,
}

export class MachineSchema extends TableRecordsSchema{
    constructor() {
        super(TABLE_NAMES.Machine);
    }

    getByCompany(company_id: any): Promise<Machine[]>{
        return new Promise((resolve, reject) => {
            const table = DB<Machine>(this.tableName);
            table.select('*')
            .where('company_id', company_id)
            .where('deleted_at', null)
            .where('visible', true)
            .then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    adminGetByCompany(company_id: any): Promise<Machine[]>{
        return new Promise((resolve, reject) => {
            const table = DB<Machine>(this.tableName);
            table.select('*')
            .where('company_id', company_id)
            .where('deleted_at', null)
            .orderBy('machine_serial_no', 'asc')
            .then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    adminSearchByCompany(company_id: any, keyword: string): Promise<Machine[]>{
        return new Promise((resolve, reject) => {
            const table = DB<Machine>(this.tableName);
            table.select('*')
            .where('company_id', company_id)
            .where('deleted_at', null)
            .whereILike('machine_serial_no', `%${keyword}%`)
            .orderBy('machine_serial_no', 'asc')
            .then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }
}