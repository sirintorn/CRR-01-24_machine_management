import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAMES.Machine, table => {
        table.string('agent_id', 20);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAMES.Machine, table => {
        table.dropColumn('agent_id');
    });
}
