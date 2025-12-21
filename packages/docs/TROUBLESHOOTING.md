# Troubleshooting Guide

## Common Issues

### Development

#### Electron Won't Start

**Symptom**: Running `npm run dev:desktop` fails or shows blank window.

**Solutions**:

1. Ensure Next.js dev server is running:

   ```bash
   # Terminal 1
   npm run dev:app

   # Terminal 2 (after Next.js starts)
   npm run dev:desktop
   ```

2. Check if port 3000 is available:

   ```bash
   lsof -i :3000
   # Kill process if needed
   kill -9 <PID>
   ```

3. Clear build artifacts:
   ```bash
   npm run clean
   npm run build
   ```

#### TypeScript Errors

**Symptom**: `tsc` fails with type errors.

**Solutions**:

1. Check which workspace has errors:

   ```bash
   npm run typecheck
   ```

2. Verify tsconfig inheritance:

   ```bash
   # Should extend from @config/typescript
   cat apps/app/tsconfig.json
   ```

3. Rebuild packages:

   ```bash
   npm run build --workspaces
   ```

4. Check for missing `.js` extensions:

   ```typescript
   // Wrong
   import { foo } from './bar';

   // Correct
   import { foo } from './bar.js';
   ```

#### Database Issues

**Symptom**: SQLite errors or missing tables.

**Solutions**:

1. Regenerate seed database:

   ```bash
   npm --workspace @packages/database run db:seed
   ```

2. Delete runtime database and restart:

   ```bash
   # macOS/Linux
   rm ~/Library/Application\ Support/Turborepo\ Electron\ Next/app.sqlite

   # Windows
   del %APPDATA%\Turborepo Electron Next\app.sqlite
   ```

3. Check migrations in `packages/database/src/index.ts`

#### IPC Not Working

**Symptom**: `window.api` is undefined or IPC calls fail.

**Solutions**:

1. Verify preload script is loaded:

   ```javascript
   // In renderer console
   console.log(window.api);
   ```

2. Check webPreferences in main.ts:

   ```typescript
   webPreferences: {
     preload: path.join(__dirname, 'preload.js'),
     contextIsolation: true,
     sandbox: true,
   }
   ```

3. Rebuild desktop app:
   ```bash
   npm --workspace @apps/desktop run build
   ```

### Build Issues

#### Next.js Standalone Missing

**Symptom**: `Cannot find .next/standalone` during Electron build.

**Solution**:

```bash
# Ensure Next.js builds with standalone output
npm run build:next

# Check if standalone exists
ls apps/app/.next/standalone
```

#### Electron Builder Fails

**Symptom**: `electron-builder` exits with error.

**Solutions**:

1. Check logs for specific error
2. Verify electron-builder.yml paths
3. Ensure all dependencies are installed:

   ```bash
   npm ci
   ```

4. Clean and rebuild:
   ```bash
   npm run clean
   npm run build
   npm run build:electron
   ```

#### Package Naming Errors

**Symptom**: `repo:check` fails.

**Solution**:

Fix package.json names to match folder structure:

```json
// apps/app/package.json
{
  "name": "@apps/app"
}

// packages/ui/package.json
{
  "name": "@packages/ui"
}
```

### Test Issues

#### Vitest Fails to Run

**Symptom**: Tests error or hang.

**Solutions**:

1. Clear coverage:

   ```bash
   rm -rf tests/vitest/coverage
   ```

2. Rebuild packages:

   ```bash
   npm run build --workspaces
   ```

3. Check test setup:
   ```bash
   # Verify setup.ts is imported
   cat tests/vitest/vitest.config.ts
   ```

#### Playwright E2E Fails

**Symptom**: Electron doesn't launch in tests.

**Solutions**:

1. Ensure app is built:

   ```bash
   npm run build
   ```

2. Install Playwright browsers:

   ```bash
   npx playwright install
   ```

3. Check Electron path in test:
   ```typescript
   const app = await electron.launch({ args: ['.'] });
   ```

### Runtime Issues

#### Blank Window in Production

**Symptom**: Packaged app shows blank window.

**Solutions**:

1. Check if standalone was packaged:

   ```bash
   # Unpack app and check
   # macOS: Show Package Contents
   # Windows: Extract installer
   ```

2. Verify next-electron-rsc handler:

   ```typescript
   // Should use electronUrl in production
   const url = isDev ? handler.localhostUrl : handler.electronUrl;
   ```

3. Check DevTools console (if enabled)

#### Database Locked Error

**Symptom**: SQLite "database is locked" error.

**Solutions**:

1. Ensure only one app instance is running
2. Check `app.requestSingleInstanceLock()` in main.ts
3. Close app completely and restart

#### Memory Leaks

**Symptom**: App slows down over time.

**Solutions**:

1. Check for IPC listener leaks:

   ```typescript
   // Add cleanup in useEffect
   useEffect(() => {
     return () => {
       // cleanup
     };
   }, []);
   ```

2. Profile with DevTools:
   - Open DevTools → Memory
   - Take heap snapshots
   - Look for detached DOM nodes

### Platform-Specific Issues

#### macOS: Notarization Fails

**Symptom**: `afterSign` script fails or app is not notarized.

**Solutions**:

1. Verify credentials:

   ```bash
   echo $APPLE_ID
   echo $APPLE_APP_SPECIFIC_PASSWORD
   echo $APPLE_TEAM_ID
   ```

2. Check Apple ID settings for app-specific password

3. Review notarization logs:
   ```bash
   xcrun notarytool history --apple-id <email> --password <password>
   ```

#### Windows: NSIS Installer Fails

**Symptom**: Installer creation fails.

**Solutions**:

1. Check if NSIS is installed (comes with electron-builder)
2. Verify certificate format (must be PFX)
3. Run as Administrator if permissions issue

#### Linux: AppImage Won't Run

**Symptom**: Double-click does nothing.

**Solutions**:

1. Make executable:

   ```bash
   chmod +x Turborepo-Electron-Next-1.0.0-x64.AppImage
   ```

2. Check required libraries:

   ```bash
   ldd <appimage> | grep "not found"
   ```

3. Install missing dependencies:
   ```bash
   sudo apt install libgconf-2-4 libgtk-3-0
   ```

## Debugging Tips

### Enable Verbose Logging

**Main Process**:

```typescript
// In main.ts
console.log('Debug info:', { isDev, dbPath, url });
```

**Renderer Process**:

```typescript
// In page component
useEffect(() => {
  console.log('Component mounted');
}, []);
```

### Chrome DevTools

Open DevTools in development:

- Menu → View → Toggle DevTools
- Or `Command+Option+I` (macOS) / `Ctrl+Shift+I` (Windows/Linux)

### Network Inspection

For development server issues:

```bash
# Check if Next.js is running
curl http://localhost:3000

# Check Next.js logs
# Terminal where `npm run dev:app` is running
```

### Database Inspection

View SQLite database:

```bash
# macOS/Linux
sqlite3 ~/Library/Application\ Support/Turborepo\ Electron\ Next/app.sqlite

# Inside sqlite3
.tables
.schema settings
SELECT * FROM settings;
```

### Turborepo Cache Issues

Clear Turborepo cache if builds behave strangely:

```bash
rm -rf .turbo
npm run clean
npm run build
```

## Getting Help

### Before Opening an Issue

1. Search existing issues
2. Check if problem persists after:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
3. Verify Node.js version: `node -v` (should be 24.x)

### Provide These Details

When reporting issues:

- OS and version
- Node.js version
- Error message (full stacktrace)
- Steps to reproduce
- Expected vs actual behavior

### Useful Commands

```bash
# Check versions
node -v
npm -v
electron -v

# Verify workspace structure
npm run repo:check

# Full rebuild
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run build

# Run specific workspace
npm --workspace @apps/app run dev

# Debug Turborepo
npx turbo run build --dry-run

# Check for security issues
npm audit
```

## Known Limitations

1. **No auto-updates**: Must be implemented separately
2. **Single-instance lock**: Only one app instance allowed
3. **SQLite limitations**: Not suitable for concurrent writes
4. **macOS universal builds**: Not supported (separate x64/arm64)

## Performance Optimization

### Slow Builds

1. Enable Turborepo remote cache
2. Use `--filter` flag:
   ```bash
   npm run build --filter=@apps/app
   ```
3. Check `.turbo/` cache is working

### Large Bundle Size

1. Analyze bundle:
   ```bash
   ANALYZE=true npm run build:next
   ```
2. Check for duplicate dependencies:
   ```bash
   npm ls <package-name>
   ```
3. Review `transpilePackages` in next.config.ts

### Slow Runtime

1. Profile with DevTools Performance tab
2. Check for N+1 database queries
3. Add indexes to frequently queried columns
