// import utils
import { cpSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// import constants
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DESKTOP_DIR = join(__dirname, '..');
const APP_DIR = join(DESKTOP_DIR, '../app');
const STANDALONE_SRC = join(APP_DIR, '.next/standalone');
const STATIC_SRC = join(APP_DIR, '.next/static');
const DEST = join(DESKTOP_DIR, 'nextjs-standalone');

/**
 * Copy Next.js standalone build to desktop app directory.
 * This script copies the standalone build and static assets to the electron app.
 */
function copyNextjsStandalone() {
  console.log('📦 Copying Next.js standalone build...');

  // Clean destination
  rmSync(DEST, { recursive: true, force: true });

  // Copy standalone build
  cpSync(STANDALONE_SRC, DEST, { recursive: true });

  // Copy static assets to standalone/.next/static
  const staticDest = join(DEST, '.next/static');
  cpSync(STATIC_SRC, staticDest, { recursive: true });

  console.log('✅ Next.js standalone build copied successfully');
}

copyNextjsStandalone();
