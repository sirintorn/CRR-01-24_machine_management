import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";
import CryptoJS from "crypto-js";
import { IDGenerator } from "../services/id_generator";

export interface License extends TableRecord{
    company_id: string,
    machine_id: string,
    machine_serial_no: string,
    type: string,
    expired_at: any,
    visible?: false,
}

export interface EncryptedLicense{
    id?: string,
    cipher: string,
    key: string,
    license_qr?: string,
    machine_qr?: string
}

export const LICENSE_TYPES = {
    free: "free",
    full: "full"
};

export class LicenseSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.Licenses);
    }

    registerLicense(license: License): Promise<License>{
        return new Promise((resolve, reject) => {
            const table = DB<License>(this.tableName);
            license.expired_at = new Date(license.expired_at);
            license.id = IDGenerator.newUUID();
            table.insert(license)
            .returning('*')
            .then(vals => {
                let l = vals[0];
                resolve(l);
            }).catch(error => {
                reject(error);
            })
        });
    }

    encryptLicense(license: License): EncryptedLicense{
        let message = JSON.stringify(license);
        let key = license.machine_serial_no;
        let result = CryptoJS.AES.encrypt(message, key).toString();
        return {
            id: license.id,
            cipher: result,
            key: license.machine_serial_no,
        };
    }

    decryptLicense(cipher: string, key: string){
        try {
            let message = CryptoJS.AES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8);
            let data = JSON.parse(message) as License;
            return data;   
        } catch (error) {
            return null;
        }
    }

    isExpired(license: License) {
        const now = new Date();
        const expired_at = new Date(license.expired_at);
        // Create new Date objects with the same date, ignoring time
        const d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const d2 = new Date(expired_at.getFullYear(), expired_at.getMonth(), expired_at.getDate());
    
        const diffInMilliseconds = d1.getTime() - d2.getTime();
        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

        // Compare the timestamps of both dates
        return {
            bool: d1.getTime() > d2.getTime(),
            exceed: diffInDays > 0 ? diffInDays : 0
        }
    }

    adminGetByCompany(company_id: string): Promise<License[]>{
        return new Promise((resolve, reject) => {
            const table = DB<License>(this.tableName);
            table.select('*')
            .where('company_id', company_id)
            .where('deleted_at', null)
            .orderBy('machine_serial_no')
            .then(vals => {
                resolve(vals);
            }).catch(error => {
                reject(error);
            });
        });
    }



}