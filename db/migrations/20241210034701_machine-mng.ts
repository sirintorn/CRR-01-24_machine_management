import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .alterTable(TABLE_NAMES.Licenses, table => {
        table.boolean('visible').defaultTo(true);
    })
    .alterTable(TABLE_NAMES.Devices, table => {
        table.string('license_id', 10);
        table.dropColumn('name');
        table.string('model', 100);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .alterTable(TABLE_NAMES.Licenses, table => {
        table.dropColumn('visible');
    })
    .alterTable(TABLE_NAMES.Devices, table => {
        table.dropColumn('license_id');
        table.string('name', 100);
        table.dropColumn('model');
    });
}

