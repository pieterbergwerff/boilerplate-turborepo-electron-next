// import utils
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';

/**
 * Validate workspace package.json name === `@<folder>/<workspace>`.
 * @returns {void}
 */
function main() {
  // import constants
  const ROOT = process.cwd();
  const FOLDERS = ['apps', 'packages', 'config', 'utils', 'tests'];
  // import types
  /** @type {string[]} */
  const errors = [];

  /**
   * Visit direct children and validate names.
   * @param {string} dir absolute path to folder (e.g. <repo>/apps)
   * @returns {void}
   */
  function visit(dir) {
    for (const entry of readdirSync(dir)) {
      const p = join(dir, entry);
      if (!statSync(p).isDirectory()) continue;
      const pkgJson = join(p, 'package.json');
      try {
        const pkg = JSON.parse(readFileSync(pkgJson, 'utf8'));
        const folder = basename(dir); // e.g. apps
        const expected = `@${folder}/${entry}`; // e.g. @apps/app
        if (pkg.name !== expected) {
          errors.push(
            `${pkgJson}: name must be '${expected}' but is '${pkg.name ?? 'undefined'}'`
          );
        }
      } catch {
        /* ignore non-packages */
      }
    }
  }

  for (const folder of FOLDERS) {
    const abs = join(ROOT, folder);
    try {
      if (statSync(abs).isDirectory()) visit(abs);
    } catch {
      /* ignore */
    }
  }

  if (errors.length) {
    console.error('\nWorkspace naming errors:');
    for (const e of errors) console.error(' -', e);
    process.exit(1);
  }
  console.log('Workspace naming OK');
}

main();
