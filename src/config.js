import knex from 'knex';

export const client = knex({
  client: 'pg',
  version: '7.2',
  connection: {
    host: 'lallah.db.elephantsql.com',
    user: 'bajrncvl',
    password: 'Vg2ttenOPAOys8B9yKGA4kBrK6s2GT86',
    database: 'bajrncvl',
  }
});