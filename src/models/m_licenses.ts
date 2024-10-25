import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";
import CryptoJS from "crypto-js";

export interface License extends TableRecord{
    company_id: string,
    machine_id: string,
    machine_serial_no: string,
    type: string,
    expired_at: any,
}

export interface EncryptedLicense{
    cipher: string,
    key: string,
    qrcode?: string
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
            cipher: result,
            key: license.machine_serial_no
        };
    }

    decryptLicense(cipher: string, key: string): License{
        let message = CryptoJS.AES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8);
        let data = JSON.parse(message) as License;
        return data;
    }

}