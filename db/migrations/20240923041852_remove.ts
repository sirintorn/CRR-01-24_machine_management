import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('products')
    .dropTableIfExists('Users')
    .dropTableIfExists('Posts')
}


export async function down(knex: Knex): Promise<void> {
}

