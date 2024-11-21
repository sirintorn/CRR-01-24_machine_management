import { Machine } from "../models/m_machines";
import { DTO } from "./dto";

export class DtoGetMachine extends DTO{
    id!: any;
    companyId!: any;
    serialNo!: string;
    bleMacAddress!: string;
    bleNo!: string;
    tinting_profile_id!: any;
    dbVersionId!: any;
    dbVersionName!: string;
    visible!: boolean;

    //coverage data
    deviceLimit: number;
    covStart: any;
    covEnd: any;

    constructor(
        machine: Machine,
        dbVersion?: any,
    ){
        super();
        this.id = machine.id;
        this.companyId = machine.company_id;
        this.serialNo = machine.machine_serial_no;
        this.bleMacAddress = machine.bluetooth_mac_address;
        this.bleNo = machine.bluetooth_no;
        this.tinting_profile_id = machine.tinting_profile_id;
        this.dbVersionId = machine.db_version_id;
        this.dbVersionName = dbVersion ? dbVersion.name : '-';
        this.visible = machine.visible ?? false;

        this.deviceLimit = machine.device_limit ?? 2;
        this.covStart = machine.coverage_start_date ?? new Date();
        this.covEnd = machine.coverage_end_date ?? new Date();
    }

    static parseFromArray(
        machines: Machine[],
        dbVersions: any[]
    ): DtoGetMachine[]{
        let arr: DtoGetMachine[] = [];
        for (let i = 0; i < machines.length; i++) {
            const item = machines[i];
            const dbV = dbVersions.find(val => val.id == item.db_version_id);
            const m = new DtoGetMachine(item, dbV);
            arr.push(m);
        }
        return arr;
    }
}