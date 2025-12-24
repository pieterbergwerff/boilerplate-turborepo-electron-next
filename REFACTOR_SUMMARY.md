# Workspace Packages Refactoring Summary

## Overview

Successfully refactored ALL workspace packages (`@packages/*` and `@utils/*`) to be source-only ESM workspaces with subpath exports, enabling deep imports via package export maps.

## Scope

**Refactored Packages:**

- `@packages/database` - Database layer with Knex/SQLite (hybrid: source for Next.js, dist for Electron)
- `@packages/hooks` - React hooks library (pure source-only)
- `@packages/storage` - MobX state management stores (pure source-only)
- `@packages/types` - TypeScript type definitions (pure source-only)
- `@packages/ui` - React component library (pure source-only) ✅ Previously completed
- `@packages/validators` - Zod validation schemas (hybrid: source for Next.js, dist for Electron)
- `@utils/client` - Client-side utilities (pure source-only)
- `@utils/common` - Cross-environment utilities (pure source-only)
- `@utils/server` - Server-side utilities (pure source-only)

## Changes Made

### 1. Package Configuration (package.json)

**Pure Source-Only Packages** (hooks, storage, types, ui, client, common, server):

```json
{
  "type": "module",
  "main": "./src/index.ts",
  "module": "./src/index.ts",
  "types": "./src/index.ts",
  "sideEffects": false,
  "files": ["src"],
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "default": "./src/index.ts"
    },
    "./*": {
      "types": "./src/*.ts",
      "default": "./src/*.ts"
    }
  },
  "typesVersions": {
    "*": {
      "*": ["./src/*"]
    }
  },
  "scripts": {
    "build": "echo 'Source-only package - no build needed'"
  }
}
```

**Hybrid Packages** (database, validators):

```json
{
  "type": "module",
  "main": "./src/index.ts",
  "module": "./src/index.ts",
  "types": "./src/index.ts",
  "sideEffects": false,
  "files": ["src"],
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "import": "./src/index.ts",
      "require": "./dist/index.js"
    },
    "./*": {
      "types": "./src/*.ts",
      "import": "./src/*.ts",
      "require": "./dist/*.js"
    }
  },
  "scripts": {
    "build": "tsc"
  }
}
```

**Rationale for Hybrid Approach:**

- **Next.js & Storybook**: Use "import" condition → get TypeScript source, transpiled on-the-fly via `transpilePackages`
- **Electron (CommonJS)**: Uses "require" condition → gets compiled JavaScript from dist/
- Electron's preload scripts MUST be CommonJS (can't use ESM at runtime)

### 2. TypeScript Configuration

**No changes needed** - All workspace packages already extend shared configs with:

- `module: "ESNext"` and `moduleResolution: "Bundler"`
- `strict: true`, `noImplicitAny: true`
- `jsx: "react-jsx"` for React packages

**Electron App Update:**

- Changed `moduleResolution: "node"` → `"nodenext"`
- Changed `module: "commonjs"` → `"nodenext"`
- Required for proper resolution of ESM workspace packages from CommonJS context

### 3. Turborepo Pipeline (turbo.json)

**Pure Source-Only Packages:**

```json
"@packages/hooks#build": {
  "cache": false,
  "outputs": []
}
```

**Hybrid Packages:**

```json
"@packages/database#build": {
  "outputs": ["dist/**"]
}
```

### 4. Next.js Integration

Updated `apps/app/next.config.ts` to transpile all workspace packages:

```typescript
transpilePackages: [
  '@packages/ui',
  '@packages/validators',
  '@packages/database',
  '@packages/hooks',
  '@packages/storage',
  '@packages/types',
  '@utils/client',
  '@utils/common',
  '@utils/server',
];
```

### 5. Storybook Integration

**Already configured** with Vite builder and `viteFinal` hook to allow monorepo access:

```typescript
viteFinal: async config => {
  if (config.server) {
    config.server.fs = {
      ...config.server.fs,
      allow: [path.resolve(__dirname, '../../..')],
    };
  }
  return config;
};
```

### 6. Cleanup

**Removed dist folders:**

- `packages/types/dist/`
- `packages/storage/dist/`
- `packages/hooks/dist/`
- `utils/client/dist/`
- `utils/common/dist/`
- `utils/server/dist/`

**Kept dist folders** (regenerated on build):

- `packages/database/dist/` - Required for Electron runtime
- `packages/validators/dist/` - Required for Electron runtime

### 7. Import Audit

**No import rewrites needed!** All existing imports remain valid:

- Workspace packages were already using barrel exports from `./src/index.ts`
- No consumers were using private/internal file paths
- All imports go through package name (e.g., `@packages/database`)

### 8. Post-Change Verification

**All root scripts tested:**

- ✅ `npm run typecheck` - 16/16 tasks successful
- ✅ `npm run lint` - 16/16 tasks successful
- ✅ `npm run format:check` - 16/16 tasks successful
- ✅ `npm run build` - 16/16 tasks successful (Next.js + Storybook + Electron)
- ✅ `npm run quality` - Complete CI pipeline passed

## Benefits

1. **Zero Build Time** for pure source-only packages
2. **Instant HMR** in development for all packages
3. **TypeScript IntelliSense** works perfectly with subpath exports
4. **Tree-Shaking** enabled via `sideEffects: false`
5. **Dual-Mode Support** - Bundlers get source, Node.js runtime gets compiled JS
6. **No Dist Artifacts** for most packages (7 out of 9 are fully source-only)

## Architecture Decision: Hybrid vs Pure Source-Only

**Why Some Packages Are Hybrid:**

The Electron desktop app runs compiled JavaScript directly without a bundler. It uses CommonJS (`require()`) which cannot load ESM TypeScript sources at runtime.

**Options Considered:**

1. ❌ Make Electron ESM - Would break preload scripts (requires CommonJS)
2. ❌ Bundle Electron with dependencies - Adds complexity, breaks external deps
3. ✅ **Conditional exports** - Provide source for bundlers, dist for Node.js

**Result:**

- `@packages/database` and `@packages/validators` used by Electron → hybrid
- All other packages → pure source-only

## Verification Results

### TypeScript Compilation

```
Tasks:    16 successful, 16 total
Cached:    12 cached, 16 total
Time:    1.683s
```

### Lint

```
Tasks:    16 successful, 16 total
Cached:    12 cached, 16 total
Time:    2.306s
```

### Build

```
Tasks:    16 successful, 16 total
Cached:    1 cached, 16 total
Time:    8.29s
```

### Build Outputs

- Next.js: Standalone build in `.next/standalone/`
- Storybook: Static site in `storybook-static/`
- Electron: Compiled JS in `apps/desktop/dist/`
- Database package: `packages/database/dist/*.js`
- Validators package: `packages/validators/dist/*.js`

## Technical Details

### Export Map Resolution

**Example for pure source-only:**

- Import: `@packages/hooks`
- Resolves to: `./src/index.ts` (via "default" export)
- Bundler transpiles on-the-fly

**Example for hybrid:**

- ESM import: `import { Settings } from '@packages/validators'`
- Resolves to: `./src/index.ts` (via "import" condition)
- CommonJS require: `const { Settings } = require('@packages/validators')`
- Resolves to: `./dist/index.js` (via "require" condition)

### Module System Compatibility

**Next.js (Turbopack):**

- Reads TypeScript source via "import" condition
- Transpiles on-demand with `transpilePackages`
- Full ESM support

**Storybook (Vite):**

- Reads TypeScript source via "default" export
- Transpiles via Vite's esbuild
- Full ESM support

**Electron (Node.js):**

- TypeScript source compiled to CommonJS in apps/desktop/dist/
- Imports workspace packages via "require" condition → gets CommonJS from packages/\*/dist/
- No `"type": "module"` in database/validators package.json so `.js` files are CommonJS
- Uses `module: "node16"` and `moduleResolution: "node16"` for building dist/

## Development Mode

### Configuration for Hybrid Packages

**packages/validators/tsconfig.json** and **packages/database/tsconfig.json**:

```json
{
  "extends": "@config/typescript/base.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "node16",
    "moduleResolution": "node16"
  }
}
```

**Key**: No `"type": "module"` in package.json means `.js` files are CommonJS by default in Node.js.

### Dev Mode Flow

1. Turborepo runs `^build` dependencies first
2. `@packages/validators` and `@packages/database` build to CommonJS in dist/
3. `@apps/desktop` compiles TypeScript with `tsc-watch`
4. Electron starts and `require()`s workspace packages
5. Package exports route "require" to dist/ with CommonJS files ✅

### Verification

```bash
npm run dev  # All servers start successfully
```

**Output:**

- ✅ Next.js ready on http://localhost:3000
- ✅ Electron started and connected
- ✅ Storybook ready on http://localhost:6006

## Migration Notes

- **Breaking Change**: None! All imports remain valid
- **Build Time**: Slightly increased for database/validators (TypeScript compilation)
- **Dev Mode**: Identical experience, all servers start successfully
- **Turborepo Cache**: Properly configured for both cached and non-cached tasks

## Future Considerations

- Monitor Electron's ESM support - may eventually allow pure source-only for all packages
- Consider adding more granular subpath exports if deep imports are needed
- Could add back barrel exports pattern if preferred alongside subpaths
- Watch bundle sizes as component library grows

## Acceptance Criteria ✅

1. ✅ Deep imports resolve through subpath exports
2. ✅ TypeScript compiles in Next.js and Storybook with no build outputs
3. ✅ All internal consumers compile after refactor
4. ✅ TypeScript IntelliSense works for all subpath imports
5. ✅ Turborepo tasks (lint, typecheck, build) remain green
6. ✅ No unnecessary dist artifacts (only 2 packages need dist for Electron)
7. ✅ All root package.json scripts verified
8. ✅ Next.js builds successfully from workspace sources
9. ✅ Storybook builds successfully from workspace sources
10. ✅ Electron builds and runs with hybrid packages

## Changes Made

### 1. Package Configuration (`packages/ui/package.json`)

**Key Updates:**

- Set `"type": "module"` for ESM
- Removed `main`, `module`, `types` fields (no build artifacts)
- Added comprehensive `exports` map with wildcard patterns:
  ```json
  {
    "./atoms/*": {
      "types": "./src/atoms/*/index.ts",
      "default": "./src/atoms/*/index.ts"
    },
    "./molecules/*": { ... },
    "./organisms/*": { ... },
    "./providers/*": { ... }
  }
  ```
- Set `"sideEffects": false` for tree-shaking
- Moved React and Next.js to `peerDependencies`
- Removed `devDependencies` (inherited from root)

### 2. TypeScript Configuration (`packages/ui/tsconfig.json`)

**Key Updates:**

- Set `"noEmit": true` (no build output)
- Changed `"module": "ESNext"` and `"moduleResolution": "Bundler"`
- Removed `rootDir` and `outDir` (not needed for source-only)
- Set `"jsx": "react-jsx"` for modern React

### 3. Turborepo Pipeline (`turbo.json`)

**Added:**

```json
"@packages/ui#build": {
  "cache": false,
  "outputs": []
}
```

This makes the build task a no-op (required by Turbo's dependency graph).

### 4. Storybook Configuration (`apps/storybook/.storybook/main.ts`)

**Added ESM \_\_dirname polyfill** and `viteFinal` hook:

```typescript
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// viteFinal hook to enable monorepo source access
viteFinal: async config => {
  if (config.server) {
    config.server.fs = {
      ...config.server.fs,
      allow: [
        path.resolve(__dirname, '../../..'), // Access to monorepo root
      ],
    };
  }
  return config;
};
```

**Note**: Since Storybook uses ESM (`"type": "module"`), `__dirname` must be created from `import.meta.url`.

### 5. Import Pattern Change

**Before (Barrel Exports):**

```typescript
import { List } from '@packages/ui';
```

**After (Deep Imports):**

```typescript
import { List } from '@packages/ui/organisms/List';
import AppProvider from '@packages/ui/providers/AppProvider'; // default export
```

**Files Updated:** 36 files across:

- `apps/app/src/app/**/*.tsx` (4 pages)
- `apps/storybook/src/**/*.stories.tsx` (32 story files)

### 6. Cleanup

**Removed:**

- `packages/ui/dist/` directory and all build artifacts
- Build-related package.json scripts

## Benefits

1. **Zero Build Time**: No compilation step for `@packages/ui`
2. **Instant HMR**: Changes reflect immediately in dev mode
3. **Explicit Dependencies**: Deep imports show exactly which components are used
4. **Better Tree-Shaking**: Bundlers can optimize based on explicit imports
5. **Simplified Maintenance**: No build artifacts to manage or commit
6. **TypeScript Integration**: Direct source consumption with full type safety

## Import Patterns Supported

### Atoms

```typescript
import { Avatar } from '@packages/ui/atoms/Avatar';
import { Badge } from '@packages/ui/atoms/Badge';
import { Button } from '@packages/ui/atoms/Button';
// ... etc
```

### Molecules

```typescript
import { Card } from '@packages/ui/molecules/Card';
import { ColorPicker } from '@packages/ui/molecules/ColorPicker';
import { SearchBox } from '@packages/ui/molecules/SearchBox';
// ... etc
```

### Organisms

```typescript
import { Accordion } from '@packages/ui/organisms/Accordion';
import { Combobox } from '@packages/ui/organisms/Combobox';
import { List } from '@packages/ui/organisms/List';
// ... etc
```

### Providers

```typescript
import AppProvider from '@packages/ui/providers/AppProvider'; // default export
```

## Verification

All quality checks pass:

- ✅ `npm run typecheck` - TypeScript compilation successful
- ✅ `npm run lint` - ESLint validation successful
- ✅ `npm run build` - Full build (Next.js + Storybook) successful

## Technical Details

### How It Works

1. **Next.js Turbopack**: Uses `transpilePackages: ['@packages/ui']` to transpile TypeScript source on-demand
2. **Storybook Vite**: Configured with `fs.allow` to access monorepo packages directly
3. **TypeScript**: Resolves deep imports via exports map wildcards (e.g., `./atoms/*` → `./src/atoms/*/index.ts`)
4. **Module Resolution**: Each component folder has `index.ts` that re-exports from the component file

### Export Map Resolution

Example for atoms:

- Import: `@packages/ui/atoms/Avatar`
- Resolves to: `./src/atoms/Avatar/index.ts`
- Which exports from: `./Avatar.atom.tsx`

The wildcard pattern `./atoms/*` maps `Avatar` → `atoms/Avatar/index.ts`, enabling clean deep imports without exposing internal file structure.

## Migration Notes

- **No Breaking Changes**: All consuming applications updated in same commit
- **Default vs Named Exports**: `AppProvider` uses default export; all others use named exports
- **Import Grouping**: Maintained project convention of grouping imports by utils → constants → components → types
- **Turborepo Cache**: Initial builds after refactor are cache misses (expected)

## Future Considerations

- Consider adding more granular subpath exports if needed (e.g., `./atoms`, `./molecules`)
- Could add back barrel exports (`@packages/ui`) if preferred, alongside deep imports
- Monitor build performance as component library grows
