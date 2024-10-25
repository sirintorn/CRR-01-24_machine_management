import type { Knex } from "knex";
import { DB, TABLE_NAMES } from "../db";
import { IDGenerator } from "../../src/services/id_generator";
import { DEVICE_OS, DEVICE_TYPES } from "../../src/models/m_devices";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .alterTable(TABLE_NAMES.Machine, table =>  {
        //default 2 devices per machine
        table.smallint('device_limit').defaultTo(2);
        table.timestamp('coverage_start_date').defaultTo(DB.fn.now());
        table.timestamp('coverage_end_date').defaultTo(DB.fn.now());
    })
    .createTableIfNotExists(TABLE_NAMES.Devices,  table => {
        table.string('id', 10).notNullable().defaultTo(IDGenerator.newUUID());
        table.string('company_id', 10).notNullable();
        table.string('machine_id', 10).notNullable();
        table.string('mac_address', 17).notNullable();
        table.boolean('visible').notNullable().defaultTo(true);

        table.string('type', 24).defaultTo(DEVICE_TYPES.others);
        table.string('name', 100);
        table.string('os', 32).defaultTo(DEVICE_OS.others);

        table.timestamps(true, true, false);
        table.string('created_by', 10);
        table.string('updated_by', 10);
        table.string('deleted_by', 10);
        table.timestamp('deleted_at');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .alterTable(TABLE_NAMES.Machine, table =>  {
        table.dropColumn('device_limit');
        table.dropColumn('coverage_start_date');
        table.dropColumn('coverage_end_date');
    })    
    .dropTableIfExists(TABLE_NAMES.Devices);
}

