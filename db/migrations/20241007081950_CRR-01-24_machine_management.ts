import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .alterTable(TABLE_NAMES.Favorite, table => {
        table.boolean('is_custom').defaultTo(true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .alterTable(TABLE_NAMES.Favorite, table => {
        table.dropColumn('is_custom');
    });
}

