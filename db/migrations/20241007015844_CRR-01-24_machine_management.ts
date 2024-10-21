import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";
import { IDGenerator } from "../../src/services/id_generator";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTableIfNotExists(TABLE_NAMES.Favorite, table => {
        table.string('id', 10).notNullable().defaultTo(IDGenerator.newUUID());
        table.string('machine_id', 10).notNullable();
        table.string('db_version_id', 10).notNullable();
        table.string('product_shade_id', 10).notNullable();

        table.timestamps(true, true, false);
        table.string('created_by', 10);
        table.string('updated_by', 10);
        table.string('deleted_by', 10);
        table.timestamp('deleted_at');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTableIfExists(TABLE_NAMES.Favorite);
}

