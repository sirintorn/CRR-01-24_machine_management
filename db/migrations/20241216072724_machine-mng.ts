import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";
import { IDGenerator } from "../../src/services/id_generator";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLE_NAMES.Machine, table => {
            table.string('store_id', 10);
        })
        .createTableIfNotExists(TABLE_NAMES.Logs, table => {
            table.string('id', 10).notNullable().defaultTo(IDGenerator.newUUID());
            
            table.string('company_id', 10).notNullable();
            table.string('machine_id', 10).notNullable();

            table.string('tag', 64).notNullable();
            table.string('log', 512).notNullable();
            table.string('input', 256);
            table.string('output', 256);
            table.string('type', 32).defaultTo('unknown');

            table.timestamps(true, true, false);
            table.string('created_by', 10);
            table.string('updated_by', 10);
            table.string('deleted_by', 10);
            table.timestamp('deleted_at');
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLE_NAMES.Machine, table => {
            table.dropColumn('store_id');
        })
        .dropTableIfExists(TABLE_NAMES.Logs);
}

