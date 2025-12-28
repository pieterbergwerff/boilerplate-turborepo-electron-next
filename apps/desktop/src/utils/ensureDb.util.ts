// import utils
import path from 'path';
import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { app } from 'electron';

// import constants
import { DB_FILE } from '../constants/db.consts.js';

/**
 * Ensure runtime SQLite exists and is seeded.
 * @param {boolean} isDev Whether app runs in dev mode
 * @returns {string} Absolute runtime DB path
 */
export const ensureDbUtil = ({ isDev }: { isDev: boolean }): string => {
  const dest = path.join(app.getPath('userData'), DB_FILE);
  if (!existsSync(dest)) {
    let src: string;
    if (isDev) {
      // In development/test, look for seed DB in packages/database/seed
      // app.getAppPath() returns apps/desktop, so go up to workspace root
      const workspaceRoot = path.join(app.getAppPath(), '..', '..');
      src = path.join(workspaceRoot, 'packages', 'database', 'seed', DB_FILE);
    } else {
      // In production (packaged), seed DB is in resources folder
      src = path.join(process.resourcesPath, DB_FILE);
    }

    if (!existsSync(src)) {
      throw new Error(`Seed database not found at: ${src}`);
    }

    mkdirSync(path.dirname(dest), { recursive: true });
    copyFileSync(src, dest);
  }
  return dest;
};

export default ensureDbUtil;
