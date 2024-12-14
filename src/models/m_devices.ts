import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";

export interface Device extends TableRecord{
    company_id: string,
    machine_id: string,
    license_id?: string,
    visible: boolean,

    mac_address: string,

    type?: string,
    os?: string,
    model?: string,
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

    getByLicense(license_id: string): Promise<Device[]>{
        return new Promise((resolve, reject) => {
            const table = DB<Device>(this.tableName);
            table.select('*')
            .where('license_id', license_id)
            .where('deleted_at', null)
            .then(vals => {
                resolve(vals);
            }).catch(error => {
                reject(error);
            });
        });
    }

    getByLicenseAndMac(license_id: string, mac_address: string): Promise<Device>{
        return new Promise((resolve, reject) => {
            const table = DB<Device>(this.tableName);
            table.select('*')
            .where('license_id', license_id)
            .where('mac_address', mac_address)
            .where('deleted_at', null)
            .then(vals => {
                resolve(vals[0] ?? null);
            }).catch(error => {
                reject(error);
            });
        });
    }

    deleteByLicenseAndMac(license_id: string, mac_address: string): Promise<void>{
        return new Promise((resolve, reject) => {
            const table = DB<Device>(this.tableName);
            table.update({deleted_at: DB.fn.now()})
            .where('license_id', license_id)
            .where('mac_address', mac_address)
            .then(() => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }

    adminGetByCompany(company_id: string): Promise<Device[]>{
        return new Promise((resolve, reject) => {
            const table = DB<Device>(this.tableName);
            table.select('*')
            .where('company_id', company_id)
            .where('deleted_at', null)
            .then(vals => {
                resolve(vals);
            }).catch(error => {
                reject(error);
            });
        });
    }
}