/**
 * Copy workspace packages script for Electron build
 * This ensures that workspace packages are properly available in the Electron build
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workspacePath = path.resolve(__dirname, '../../..');
const desktopPath = path.resolve(__dirname, '..');
const nodeModulesPath = path.join(desktopPath, 'node_modules', '@packages');

console.log('📦 Preparing workspace packages for Electron build...');

// Ensure @packages directory exists
if (!fs.existsSync(nodeModulesPath)) {
  fs.mkdirSync(nodeModulesPath, { recursive: true });
}

// List of workspace packages to copy
const packages = ['database', 'validators'];

packages.forEach(pkg => {
  const srcPath = path.join(workspacePath, 'packages', pkg);
  const destPath = path.join(nodeModulesPath, pkg);

  console.log(`📋 Copying ${pkg} package...`);
  console.log(`  Source: ${srcPath}`);
  console.log(`  Destination: ${destPath}`);

  // Check if source exists
  if (!fs.existsSync(srcPath)) {
    console.log(`  ❌ Source package does not exist: ${srcPath}`);
    return;
  }

  // Remove existing if it exists
  if (fs.existsSync(destPath)) {
    fs.rmSync(destPath, { recursive: true, force: true });
  }

  // Copy package.json
  const packageJsonSrc = path.join(srcPath, 'package.json');
  const packageJsonDest = path.join(destPath, 'package.json');

  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath, { recursive: true });
  }

  if (fs.existsSync(packageJsonSrc)) {
    fs.copyFileSync(packageJsonSrc, packageJsonDest);
    console.log(`  ✅ Copied package.json`);
  } else {
    console.log(`  ⚠️  package.json not found at ${packageJsonSrc}`);
  }

  // Copy dist directory if it exists
  const distSrc = path.join(srcPath, 'dist');
  const distDest = path.join(destPath, 'dist');

  if (fs.existsSync(distSrc)) {
    copyDir(distSrc, distDest);
    console.log(`  ✅ Copied dist/`);
  }

  // For database package, only copy the specific seed file we need
  if (pkg === 'database') {
    // Copy seed directory
    const seedDir = path.join(srcPath, 'seed');
    const seedDest = path.join(destPath, 'seed');

    if (fs.existsSync(seedDir)) {
      copyDir(seedDir, seedDest);
      console.log(`  ✅ Copied seed/`);
    }
  }
});

console.log('✅ Workspace packages prepared for Electron build');

/**
 * Recursively copy directory with exclusions
 */
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const items = fs.readdirSync(src);

  // Directories and files to exclude
  const excludes = [
    'node_modules',
    '.git',
    '.turbo',
    '.next',
    'dist',
    'build',
    'coverage',
    '.nyc_output',
    'tmp',
    'temp',
    '.cache',
  ];

  items.forEach(item => {
    // Skip excluded items
    if (excludes.includes(item)) {
      return;
    }

    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stats = fs.statSync(srcPath);

    if (stats.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (stats.isFile()) {
      // Only copy reasonably sized files (skip files > 100MB)
      if (stats.size < 100 * 1024 * 1024) {
        fs.copyFileSync(srcPath, destPath);
      } else {
        console.log(
          `  ⚠️  Skipping large file: ${item} (${(stats.size / 1024 / 1024).toFixed(1)}MB)`
        );
      }
    }
  });
}
