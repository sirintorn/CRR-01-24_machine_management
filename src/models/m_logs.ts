import { TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";

export interface Log extends TableRecord{
    company_id: string;
    machine_id: string;
    tag: string;
    log: string;
    input: string;
    output: string;
    type: string;
}

export const LOG_TYPES = {
    unknown: 'unknown'
}

export class LogSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.Logs);
    }
}