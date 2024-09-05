import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTableIfNotExists(TABLE_NAMES.Users, table => {
        table.uuid('id').notNullable().primary().defaultTo(knex.fn.uuid());
        table.string('username', 20).notNullable();
        table.string('password_hash', 32).notNullable();
        table.uuid('created_by');
        table.uuid('updated_by');
        table.timestamps(true, true, false);
        table.uuid('deleted_by');
        table.timestamp('deleted_at');
    })
    .createTableIfNotExists(TABLE_NAMES.Posts, table => {
        table.uuid('id').notNullable().primary().defaultTo(knex.fn.uuid());
        table.string('content', 400).defaultTo('Just another post.');
        table.uuid('created_by');
        table.uuid('updated_by');
        table.timestamps(true, true, false);
        table.uuid('deleted_by');
        table.timestamp('deleted_at');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTableIfExists(TABLE_NAMES.Users)
    .dropTableIfExists(TABLE_NAMES.Posts);
}