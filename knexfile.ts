import type { Knex } from "knex";
import dotenv from 'dotenv';

dotenv.config();

//to migrate run $ knex migrate:latest
//ro rollback run $ knex migrate:rollback

// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: process.env.DB_DEV_URL,
    migrations: {
      directory: './db/migrations'
    }
  },
  staging: {
    client: 'pg',
    connection: process.env.DB_STAG_URL,
    migrations: {
      directory: './db/migrations'
    }
  }

};

module.exports = config;
export default config;