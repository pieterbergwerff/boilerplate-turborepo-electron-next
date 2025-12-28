// import utils
import { app } from 'electron';
import ensureDb from './ensureDb.util.js';
import { createDb, runMigrations } from '@packages/database';

// import types
import type { Knex } from 'knex';

let knexInstance: Knex | null = null;

/**
 * Initialize and reuse a single Knex instance.
 * @returns {Promise<Knex>} Knex instance
 */
export async function getKnexUtil(): Promise<Knex> {
  if (knexInstance) return knexInstance;
  const dbPath = ensureDb({ isDev: !app.isPackaged });
  knexInstance = createDb(dbPath);
  await runMigrations(knexInstance, dbPath);
  return knexInstance;
}

export default getKnexUtil;
