import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";

export interface Device extends TableRecord{
    company_id: string,
    machine_id: string,
    mac_address: string,
    visible: boolean,

    type?: string,
    name?: string,
    os?: string,
}

export const DEVICE_TYPES = {
    mobile: 'mobile',
    tablet: 'tablet',
    desktop: 'desktop',
    others: 'others'
}

export const DEVICE_OS = {
    android: 'android',
    ios: 'ios',
    windows: 'windows',
    osx: 'osx',
    linux: 'linux',
    others: 'others'
}

export class DeviceSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.Devices);
    }

    getByMachine(machine_id: string): Promise<Device[]>{
        return new Promise((resolve, reject) => {
            const table = DB<Device>(this.tableName);
            table.select('*')
            .where('machine_id', machine_id)
            .where('deleted_at', null)
            .then(vals => {
                resolve(vals);
            }).catch(error => {
                reject(error);
            });
        });
    }
}