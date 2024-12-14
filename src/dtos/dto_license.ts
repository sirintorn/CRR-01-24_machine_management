import { Device } from "../models/m_devices";
import { EncryptedLicense, License } from "../models/m_licenses";

export class DTOLicense{
    id: string;
    company_id: string;
    machine_id: string;
    machine_serial_no: string;
    type: string;
    expired_at: any;
    visible?: boolean;
    cipher?: string;
    activate_count?: number;


    constructor(data: License, encrypted: EncryptedLicense, devices: Device[]){
        this.id = data.id;
        this.company_id = data.company_id;
        this.machine_id = data.machine_id;
        this.machine_serial_no = data.machine_serial_no;
        this.type = data.type;
        this.expired_at = new Date(data.expired_at);
        this.visible = data.visible;
        this.cipher = encrypted.cipher;
        this.activate_count = devices.length;
    }

}