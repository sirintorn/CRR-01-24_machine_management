import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";

export interface Machine extends TableRecord {
    company_id: any;
    machine_serial_no: string;
    agent_id?: string,
    bluetooth_mac_address: string;
    bluetooth_no: string;
    tinting_profile_id?: any;
    db_version_id?: any;
    visible?: boolean;
    paint_co_id?: string;
    store_id?: any;

    //coverage data
    device_limit: number,
    coverage_start_date: any,
    coverage_end_date: any,
}

export const COMPANY_ROLES = {
    // CRR
    coloriance: 'coloriance',
    // AGENT
    agent: 'agent',
    // PAINT COMPANY
    paint_co: 'company',
    // FRANCHISES / STORES
    paint_store: 'store'
}

export class MachineSchema extends TableRecordsSchema {
    constructor() {
        super(TABLE_NAMES.Machine);
    }



    delete(id: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            //not an actual delete, just symbolically delete
            table.where('id', id)
                .update({ 'deleted_at': DB.fn.now() }).then((val) => {
                    resolve(val);
                }).catch(error => {
                    reject(error);
                });
        });
    }

    deleteAgent(id: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            //not an actual delete, just symbolically delete
            table.where('id', id)

                .update({ 'deleted_at': DB.fn.now() }).then((val) => {
                    resolve(val);
                }).catch(error => {
                    reject(error);
                });
        });
    }

    getAllMachineByAgentCompany(agent_id: any, company_id: any,): Promise<Machine[]> {
        return new Promise((resolve, reject) => {
            const table = DB<Machine>(this.tableName);
            table.select('*')
                .where('company_id', company_id)
                .where('agent_id', agent_id)
                .where('deleted_at', null)
                .orderBy('machine_serial_no', 'asc')
                .then(vals => {
                    resolve(vals);
                }).catch(error => {
                    reject(error)
                })
        });
    }


    //------BY COMPANY------//
    getByCompany(company_id: any): Promise<Machine[]> {
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
    adminGetByCompany(company_id: any): Promise<Machine[]> {
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
    adminSearchByCompany(company_id: any, keyword: string): Promise<Machine[]> {
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

    //------BY AGENT------//
    getByAgent(company_id: any): Promise<Machine[]> {
        return new Promise((resolve, reject) => {
            const table = DB<Machine>(this.tableName);
            table.select('*')
                .where('agent_id', company_id)
                .where('deleted_at', null)
                .where('visible', true)
                .then((val) => {
                    resolve(val);
                }).catch(error => {
                    reject(error);
                });
        });
    }
    adminGetByAgent(company_id: any): Promise<Machine[]> {
        return new Promise((resolve, reject) => {
            const table = DB<Machine>(this.tableName);
            table.select('*')
                .where('agent_id', company_id)
                .where('deleted_at', null)
                .orderBy('machine_serial_no', 'asc')
                .then((val) => {
                    resolve(val);
                }).catch(error => {
                    reject(error);
                });
        });
    }
    adminSearchByAgent(company_id: any, keyword: string): Promise<Machine[]> {
        return new Promise((resolve, reject) => {
            const table = DB<Machine>(this.tableName);
            table.select('*')
                .where('agent_id', company_id)
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

    //------BY PAINT CO------//
    getByPaintCo(company_id: any): Promise<Machine[]> {
        return new Promise((resolve, reject) => {
            const table = DB<Machine>(this.tableName);
            table.select('*')
                .where('paint_co_id', company_id)
                .where('deleted_at', null)
                .where('visible', true)
                .then((val) => {
                    resolve(val);
                }).catch(error => {
                    reject(error);
                });
        });
    }
    adminGetByPaintCo(company_id: any): Promise<Machine[]> {
        return new Promise((resolve, reject) => {
            const table = DB<Machine>(this.tableName);
            table.select('*')
                .where('paint_co_id', company_id)
                .where('deleted_at', null)
                .orderBy('machine_serial_no', 'asc')
                .then((val) => {
                    resolve(val);
                }).catch(error => {
                    reject(error);
                });
        });
    }
    adminSearchByPaintCo(company_id: any, keyword: string): Promise<Machine[]> {
        return new Promise((resolve, reject) => {
            const table = DB<Machine>(this.tableName);
            table.select('*')
                .where('paint_co_id', company_id)
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

    //------BY PAINT STORE------//
    getByPaintStore(company_id: any): Promise<Machine[]> {
        return new Promise((resolve, reject) => {
            const table = DB<Machine>(this.tableName);
            table.select('*')
                .where('store_id', company_id)
                .where('deleted_at', null)
                .where('visible', true)
                .then((val) => {
                    resolve(val);
                }).catch(error => {
                    reject(error);
                });
        });
    }
    adminGetByPaintStore(company_id: any): Promise<Machine[]> {
        return new Promise((resolve, reject) => {
            const table = DB<Machine>(this.tableName);
            table.select('*')
                .where('store_id', company_id)
                .where('deleted_at', null)
                .orderBy('machine_serial_no', 'asc')
                .then((val) => {
                    resolve(val);
                }).catch(error => {
                    reject(error);
                });
        });
    }
    adminSearchByPaintStore(company_id: any, keyword: string): Promise<Machine[]> {
        return new Promise((resolve, reject) => {
            const table = DB<Machine>(this.tableName);
            table.select('*')
                .where('store_id', company_id)
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