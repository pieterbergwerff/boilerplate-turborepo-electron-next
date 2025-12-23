// Electron install script for next-electron-rsc
// This ensures Electron is properly installed and next-electron-rsc is built
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Electron install script executed');

// Build next-electron-rsc if it exists and isn't built
const nerscLibPath = path.join(__dirname, '..', '..', '..', 'node_modules', 'next-electron-rsc', 'lib');
const nerscBuildPath = path.join(nerscLibPath, 'build', 'index.js');

if (fs.existsSync(nerscLibPath) && !fs.existsSync(nerscBuildPath)) {
  console.log('Building next-electron-rsc...');
  try {
    // Add skipLibCheck to tsconfig temporarily
    const tsconfigPath = path.join(nerscLibPath, 'tsconfig.json');
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
    tsconfig.compilerOptions = tsconfig.compilerOptions || {};
    tsconfig.compilerOptions.skipLibCheck = true;
    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
    
    // Build the library
    execSync('npm run build', { cwd: nerscLibPath, stdio: 'inherit' });
    console.log('next-electron-rsc built successfully');
  } catch (error) {
    console.error('Failed to build next-electron-rsc:', error.message);
    process.exit(1);
  }
}

