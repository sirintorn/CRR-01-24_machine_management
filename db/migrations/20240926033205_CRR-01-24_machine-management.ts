import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .alterTable(TABLE_NAMES.Machine, table => {
        table.dropColumn('bluetooh_mac_address');
        table.string('bluetooth_mac_address', 17);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .alterTable(TABLE_NAMES.Machine, table => {
        table.dropColumn('bluetooth_mac_address');
        table.string('bluetooh_mac_address', 17);
    });
}

