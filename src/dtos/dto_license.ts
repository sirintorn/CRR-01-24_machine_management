import { License } from "../models/m_licenses";

export class DTOLicense{
    id: string;
    company_id: string;
    machine_id: string;
    machine_serial_no: string;
    type: string;
    expired_at: any;

    constructor(data: License){
        this.id = data.id;
        this.company_id = data.company_id;
        this.machine_id = data.machine_id;
        this.machine_serial_no = data.machine_serial_no;
        this.type = data.type;
        this.expired_at = new Date(data.expired_at);
    }
}