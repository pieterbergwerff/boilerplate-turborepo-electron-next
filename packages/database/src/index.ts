// import utils
// (none)
// import constants
// (none)
// import components
// (none)
// import types
import type { Knex } from 'knex';
import knexFactory from 'knex';
import { Settings, type Theme } from '@packages/validators';

/**
 * Create a Knex instance for a given SQLite file path.
 * @param {string} dbPath Absolute path to SQLite file
 * @returns {Knex} Knex instance configured for sqlite3
 */
export function createDb(dbPath: string): Knex {
  return knexFactory({
    client: 'sqlite3',
    connection: { filename: dbPath },
    useNullAsDefault: true,
  });
}

/**
 * Run idempotent migrations for the settings table (single-row).
 * @param {Knex} knex Knex instance
 * @param {string} _dbPath Absolute path to SQLite file (for clarity in logs)
 * @returns {Promise<void>} Resolves when migrations complete
 */
export async function runMigrations(knex: Knex, _dbPath: string): Promise<void> {
  const hasSettings = await knex.schema.hasTable('settings');
  if (!hasSettings) {
    await knex.schema.createTable('settings', t => {
      t.integer('id').primary().notNullable();
      t.text('theme').notNullable();
      t.text('updated_at').notNullable();
    });
    await knex('settings').insert({
      id: 1,
      theme: 'light',
      updated_at: new Date().toISOString(),
    });
  } else {
    const row = await knex('settings').where({ id: 1 }).first();
    if (!row) {
      await knex('settings').insert({
        id: 1,
        theme: 'light',
        updated_at: new Date().toISOString(),
      });
    }
  }
}

/**
 * Fetch current settings.
 * @param {Knex} knex Knex instance
 * @returns {Promise<import('@packages/validators').Settings>} Current settings object
 */
export async function getSettings(knex: Knex) {
  const row = await knex('settings').where({ id: 1 }).first();
  const parsed = Settings.safeParse({
    theme: (row?.theme as Theme) ?? 'light',
    updatedAt: (row?.updated_at as string) ?? new Date().toISOString(),
  });
  if (!parsed.success) throw new Error(parsed.error.message);
  return parsed.data;
}

/**
 * Update theme in settings.
 * @param {Knex} knex Knex instance
 * @param {import('@packages/validators').SettingsUpdateInput} input Parsed input (theme)
 * @returns {Promise<import('@packages/validators').Settings>} Updated settings
 */
export async function updateSettings(
  knex: Knex,
  input: { theme: 'light' | 'dark' }
) {
  const { theme } = input;
  const updatedAt = new Date().toISOString();
  await knex('settings')
    .update({ theme, updated_at: updatedAt })
    .where({ id: 1 });
  return { theme, updatedAt };
}
