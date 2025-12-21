// import utils
import { existsSync, mkdirSync, copyFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// import constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = 'app.sqlite';
// import components
import { createDb, runMigrations } from '../dist/index.js';

/**
 * Generate seed database for packaging.
 * @returns {Promise<void>}
 */
async function main() {
  const seedDir = path.join(__dirname, '..', 'seed');
  const seedPath = path.join(seedDir, DB_FILE);

  // Clean and recreate seed directory
  if (existsSync(seedDir)) {
    rmSync(seedDir, { recursive: true });
  }
  mkdirSync(seedDir, { recursive: true });

  // Create and migrate database
  const knex = createDb(seedPath);
  await runMigrations(knex, seedPath);
  await knex.destroy();

  console.log(`✓ Seed database generated: ${seedPath}`);
}

main().catch(err => {
  console.error('Failed to generate seed database:', err);
  process.exit(1);
});
