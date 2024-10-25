import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";
import { IDGenerator } from "../../src/services/id_generator";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTableIfNotExists(TABLE_NAMES.Licenses, table => {
        table.string('id', 10).notNullable().defaultTo(IDGenerator.newUUID());
        
        table.string('company_id', 10).notNullable();
        table.string('machine_id', 10).notNullable();
        table.string('machine_serial_no').notNullable();
        table.string('type').notNullable();
        table.timestamp('expired_at').notNullable();

        table.timestamps(true, true, false);
        table.string('created_by', 10);
        table.string('updated_by', 10);
        table.string('deleted_by', 10);
        table.timestamp('deleted_at');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTableIfExists(TABLE_NAMES.Licenses);
}

