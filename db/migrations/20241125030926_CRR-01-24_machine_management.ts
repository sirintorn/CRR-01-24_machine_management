import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";
import { IDGenerator } from "../../src/services/id_generator";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTableIfNotExists(TABLE_NAMES.AccuracyTest, table => {
        table.string('id', 10).notNullable().defaultTo(IDGenerator.newUUID());
        table.string('tinting_profile_id', 10).notNullable();
        table.integer('index').notNullable().defaultTo(0);
        table.string('tinter_code', 20).notNullable();
        table.string('tinter_name', 30).notNullable();
        table.double('target_ml').defaultTo(0);
        table.float('target_err_rate').defaultTo(0);
        table.integer('repeat').defaultTo(0);
        table.integer('result_step').defaultTo(0);
        table.double('result_ml').defaultTo(0);
        table.double('result_g').defaultTo(0);
        table.float('result_err_rate').defaultTo(0);
        table.string('status', 10).defaultTo(0);
        table.double('created').defaultTo(0);
        table.double('modified').defaultTo(0);
        table.timestamps(true, true, false);
        table.string('created_by', 10);
        table.string('updated_by', 10);
        table.string('deleted_by', 10);
        table.timestamp('deleted_at');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTableIfExists(TABLE_NAMES.AccuracyTest);
}

