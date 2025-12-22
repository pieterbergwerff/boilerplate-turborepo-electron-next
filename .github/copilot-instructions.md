# Copilot Instructions for Turborepo + Electron + Next.js Boilerplate

## Architecture Overview

This is a **Turborepo v2.3.4 monorepo** for cross-platform Electron desktop apps (Windows/macOS/Linux) powered by Next.js 16+ with App Router and Server Components:

### Core Structure

- `apps/app/` - Next.js 16 app (App Router, React 19) - the UI layer
- `apps/desktop/` - Electron 39 with `next-electron-rsc` integration, SQLite database, IPC layer
- `apps/storybook/` - Storybook for component development
- `apps/tests/` - Vitest UI runner (legacy, being phased out)
- `packages/ui/` - Shared React component library (atoms/molecules/organisms/pages/templates)
- `packages/tests/` - Shared Vitest test utilities
- `packages/database/` - SQLite3 + Knex migrations, seeds, typed repositories
- `packages/validators/` - Zod schemas/types shared across main/preload/renderer/Next
- `config/` - Shared ESLint, Prettier, TypeScript configurations (consumed via package exports)
- `utils/` - Shared utilities (common/client/server) with strict typing
- `tests/` - Centralized testing workspaces (vitest unit/integration, playwright E2E)

### Key Architectural Pattern: next-electron-rsc Integration

**Critical**: Uses `next-electron-rsc` for in-process Next.js (no open ports in production):

- **Development**: Next dev server + HMR on `localhost:3000`; Electron loads via `handler.localhostUrl`
- **Production**: Next `output: 'standalone'` served via `createHandler`/`createInterceptor` with Electron `protocol` - fully offline, self-contained
- **Configuration**: `serverExternalPackages: ['electron']`; Next as **dependency** (not devDep); `prepare` script runs `electron/install.js`
- **Dynamic Routes**: Any page/route using Electron/Node APIs must have `export const dynamic = 'force-dynamic'`

See [apps/desktop/src/main.ts](apps/desktop/src/main.ts) for handler setup.

## Critical Workflows

### Development

```bash
npm run dev              # Starts Next.js dev server, Electron (tsc-watch), Storybook, Vitest UI (all with logs prefixed per task)
npm run dev:app          # Next.js only (port 3000)
npm run dev:desktop      # Electron only (requires Next.js running first)
```

**Important**: `dev:desktop` expects Next.js on port 3000. Always run `dev:app` first or use `npm run dev` which orchestrates everything.

### Building

```bash
npm run build            # Build all packages/apps (Turborepo orchestrates order)
npm run build:next       # Creates standalone Next.js build in apps/app/.next/standalone
npm run build:electron   # TypeScript compile + electron-builder packaging (includes Next standalone)
```

**Build order**: `^build` dependencies in `turbo.json` ensure proper sequencing. `electron-builder` packages `.next/standalone/<appName>/**/*` (excluding Electron binary) with seed DB as extra resource.

**Cross-platform artifacts**:

- Windows: NSIS one-click installer (x64)
- macOS: DMG (separate x64 and arm64 builds, no universal), signed & notarized when secrets provided
- Linux: AppImage + DEB (x64)

### Database & Seed Strategy

SQLite3 + Knex in **main process**:

- **Seed DB**: `packages/database/seed/app.sqlite` generated during build via migrations against temp path
- **Runtime**: On first launch, copies seed DB from `process.resourcesPath` to `app.getPath('userData')/app.sqlite`
- **Migrations**: Run idempotently on app startup against runtime DB
- **Repository API**: Typed services expose DB operations to Next server/route handlers and via IPC

### Testing

```bash
npm run test             # All tests (Vitest unit/integration + Playwright E2E)
npm run test:unit        # Unit tests via @tests/vitest with coverage (thresholds: 80% lines/functions/statements, 75% branches)
npm run test:e2e         # Playwright E2E for Electron workflows
npm run test:coverage    # Run tests with coverage reports
npm run test:ui          # Vitest interactive watch mode
```

**Test locations**: No tests inside `apps/*` - all tests in `tests/*` workspaces. Coverage includes `apps/*/src/**` and `packages/*/src/**`.

### Quality Checks

```bash
npm run quality          # Runs typecheck + lint + format:check (CI equivalent)
npm run quality:fix      # Auto-fixes formatting and lint issues
npm run repo:check       # Validates workspace naming follows @folder/workspace convention
```

Use `quality` before commits. CI enforces these checks plus `audit-ci` security scanning.

## Project-Specific Conventions

### Workspace & Package Naming

**Strict convention**: Package names must match folder structure using `@folder/workspace` pattern:

- `@apps/app` - Next.js application
- `@apps/desktop` - Electron application
- `@apps/storybook` - Storybook workspace
- `@apps/tests` - Vitest UI runner (legacy)
- `@packages/ui` - UI component library
- `@packages/database` - SQLite + Knex
- `@packages/validators` - Zod schemas/types
- `@config/typescript` - Shared TypeScript configs
- `@config/eslint` - Shared ESLint configs
- `@config/prettier` - Shared Prettier configs
- `@utils/common` - Cross-environment utilities
- `@utils/client` - Client-only utilities
- `@utils/server` - Server-only utilities
- `@tests/vitest` - Unit/integration tests
- `@tests/playwright` - E2E tests

**Enforcement**: Run `npm run repo:check` to validate naming. CI blocks builds on violations.

Reference packages in dependencies: `"@packages/ui": "*"`

### Module System: ESM-Only

**Critical**: Entire repo is ESM (`"type": "module"`):

- TypeScript: `moduleResolution: "nodenext"`, `module: "nodenext"`
- Import syntax: Always `.js` extensions in TypeScript imports (e.g., `import { foo } from './bar.js'`)
- No CommonJS except where Electron requires it (main process uses `require` at runtime while TS source is ESM)
- Config files: `.mjs` preferred or `.js` with `type: module`

### TypeScript Configuration Inheritance

All packages extend shared configs from `config/typescript/`:

```json
{
  "extends": "@config/typescript/nextjs.json" // or base.json, react-library.json, package.json
}
```

**Strict mode enforced**:

- `noImplicitAny: true` - **No `any` allowed** (ESLint rule: `@typescript-eslint/no-explicit-any: error`)
- `exactOptionalPropertyTypes: true`
- `strict: true`

Do not duplicate tsconfig settings - add to shared configs in `config/typescript/`.

### Code Quality Standards

**JSDoc requirement**: Every function must have JSDoc with description, params, and return type:

```typescript
/**
 * Fetch current settings from the database.
 * @param {Knex} knex Knex instance
 * @returns {Promise<Settings>} Current settings object
 */
export async function getSettings(knex: Knex): Promise<Settings> {
  // implementation
}
```

**Import grouping** (enforced order in every file):

1. Utils (e.g., `path`, `fs`, utility libraries)
2. Constants (e.g., `const DB_FILE = 'app.sqlite'`)
3. Components (e.g., React components, UI)
4. Types (e.g., `import type { ... }`)
5. Other (external dependencies, frameworks)

Each group separated by blank line with comment:

```typescript
// import utils
import path from 'node:path';
// import constants
const PORT = 3000;
// import components
import { Button } from '@packages/ui';
// import types
import type { Settings } from '@packages/validators';
```

### Turborepo Task Dependencies

Tasks in `turbo.json` use `^` prefix to depend on dependencies' tasks:

- `"dependsOn": ["^build"]` means "build dependencies first"
- Modify `turbo.json` outputs when changing build directories
- Use `cache: false` for persistent dev servers (`dev`, `start`) and formatting tasks (`format`, `format:check`)

### IPC Design (Typed with Zod)

All IPC communication validated with Zod schemas from `@packages/validators`:

**Channels** (request → response):

- `app:get-info` → `{ version: string; platform: string; arch: string }`
- `db:migrate` → `{ applied: number }`
- `settings:get` → `Settings`
- `settings:update` (`{ theme: 'light' | 'dark' }`) → `Settings`
- `fs:openDialog` (`{ filters?: { name: string; extensions: string[] }[] }`) → `{ filePaths: string[] }`

**Security**:

- `contextIsolation: true`, `nodeIntegration: false`, `sandbox: true`
- Only allow-listed channels in preload
- Every payload validated in preload/main before processing

**Preload pattern** (`apps/desktop/src/preload.ts`):

```typescript
contextBridge.exposeInMainWorld('api', {
  getSettings: (): Promise<Settings> => ipcRenderer.invoke('settings:get'),
  setTheme: (theme: Theme): Promise<Settings> =>
    ipcRenderer.invoke('settings:update', { theme }),
});
```

### Next.js Configuration for Electron

Key `next.config.ts` settings:

- `output: 'standalone'` - Creates self-contained build (removed in dev for HMR)
- `serverExternalPackages: ['electron']` - Prevents Electron bundling
- `transpilePackages: ['@packages/ui', '@packages/validators']` - Transpile monorepo packages
- **CSP headers**: Content Security Policy defined in config for security
- **Bundle analyzer**: Optional via `ANALYZE=true` env var

### Shared Component Pattern

Components in `packages/ui/` organized by atomic design (atoms/molecules/organisms/pages/templates):

```tsx
// import utils
// (none)
// import constants
// (none)
// import components
// (none)
// import types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

/**
 * Reusable button component with variants.
 * @param {ButtonProps} props Component props
 * @returns {JSX.Element} Rendered button
 */
export function Button({
  children,
  variant = 'primary',
}: ButtonProps): JSX.Element {
  // No inline styles - use CSS modules or no styling framework by default
}
```

**No default exports** - always use named exports for tree-shaking.

**No styling frameworks by default** - no Tailwind/Radix/shadcn included in boilerplate.

## Environment & Tooling

- **Node.js**: 24.x only (specified in `engines`, `.nvmrc`, and CI)
- **Package Manager**: npm workspaces (not pnpm/yarn) with `engine-strict=true`
- **Module System**: ESM-only (`"type": "module"` in all packages)
- **TypeScript**: 5.8+ with strict mode, `noImplicitAny`, `exactOptionalPropertyTypes`
- **ESLint**: Flat config (`eslint.config.js`) with TypeScript, React, a11y rules, and `no-explicit-any: error`
- **Prettier**: Root `.prettierrc` or `@config/prettier` consumed by workspaces
- **Git Hooks**: Husky + lint-staged for pre-commit quality checks
- **Security**: `audit-ci` in CI with strict thresholds (high/critical block builds)
- **Testing**: Vitest (unit/integration), Playwright (E2E), coverage thresholds enforced
- **Storybook**: Latest version for `packages/ui` with CSF3 stories and composition
- **Electron Builder**: YAML config with `asar: false`, per-OS targets, signing/notarization hooks
- **GitHub Actions**: Matrix builds (Windows/macOS/Linux), quality gates, security scans

## Database & Data Layer

### SQLite3 + Knex Architecture

**Location**: Main process only (`apps/desktop/src/db.ts`)

**Seed strategy**:

1. Build-time: Run Knex migrations against temp DB → generate `packages/database/seed/app.sqlite`
2. Package-time: Include seed DB as `extraResources` in electron-builder
3. Runtime: On first launch, copy from `process.resourcesPath` to `app.getPath('userData')/app.sqlite`
4. Startup: Run idempotent migrations against runtime DB

**Schema example** (`settings` table - single row):

```sql
CREATE TABLE settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  theme TEXT NOT NULL CHECK (theme IN ('light', 'dark')),
  updated_at TEXT NOT NULL
);
```

**Repository pattern**:

```typescript
/**
 * Fetch current settings from database.
 * @param {Knex} knex Knex instance
 * @returns {Promise<Settings>} Validated settings object
 */
export async function getSettings(knex: Knex): Promise<Settings> {
  const row = await knex('settings').where({ id: 1 }).first();
  return Settings.parse({ theme: row?.theme, updatedAt: row?.updated_at });
}
```

**Access patterns**:

- Next.js Server Components/Route Handlers: Direct Knex calls via imported repositories
- Renderer process: Via IPC (`settings:get`, `settings:update`)

### Validators Package (`@packages/validators`)

Zod schemas shared across all layers:

```typescript
// import utils
import { z } from 'zod';

// Schemas
export const Theme = z.enum(['light', 'dark']);
export const Settings = z.object({
  theme: Theme,
  updatedAt: z.string().datetime(),
});
export const SettingsUpdateInput = z.object({ theme: Theme });

// Types
export type Theme = z.infer<typeof Theme>;
export type Settings = z.infer<typeof Settings>;
export type SettingsUpdateInput = z.infer<typeof SettingsUpdateInput>;
```

**Usage**: Import both schema (for validation) and type (for TypeScript) from same package.

## Common Pitfalls

1. **Don't run Electron without Next.js**: `dev:desktop` requires Next.js dev server on port 3000
2. **Standalone build required**: Electron packaging needs `.next/standalone/` - run `build:next` first
3. **Workspace naming**: Package names must match `@folder/workspace` - run `repo:check` to validate
4. **No `any` allowed**: TypeScript strict mode + ESLint rule blocks all `any` usage
5. **ESM import extensions**: Always use `.js` extensions in imports (e.g., `'./utils.js'`) even for `.ts` files
6. **CommonJS in Electron**: Main process uses `require` at runtime; TypeScript source is still ESM
7. **Test location**: No tests in `apps/*` - consolidate in `tests/*` workspaces
8. **Config duplication**: Never duplicate configs - extend from `config/*` workspaces
9. **IPC validation**: Always validate payloads with Zod before processing
10. **DB access**: SQLite only from main process - renderer must use IPC
11. **JSDoc required**: Every function needs JSDoc with description/params/return
12. **Import order**: Follow utils → constants → components → types → other pattern
13. **No styling frameworks**: No Tailwind/Radix/shadcn by default in boilerplate
14. **Dynamic routes**: Mark Next.js routes using Electron/Node APIs as `export const dynamic = 'force-dynamic'`
15. **Turborepo cache**: Run `clean` task if builds behave strangely after major changes

## Security & Best Practices

### Electron Security

- **Sandboxed renderer**: `sandbox: true`, `contextIsolation: true`, `nodeIntegration: false`
- **Preload allowlist**: Only expose explicitly needed APIs via `contextBridge`
- **CSP headers**: Content Security Policy in Next.js config restricts script/style sources
- **IPC validation**: Zod schemas validate all IPC payloads before processing
- **Single instance**: `app.requestSingleInstanceLock()` prevents multiple app instances

### CI/CD Security

- **Audit gates**: `audit-ci` blocks builds on high/critical vulnerabilities
- **CodeQL scanning**: GitHub security analysis (optional but recommended)
- **Dependency updates**: Use Renovate/Dependabot for automated updates
- **Signing**: Electron Builder with certificates for Windows/macOS (secrets in CI)
- **Notarization**: macOS apps notarized when `APPLE_*` secrets provided

### Code Quality Gates

Pre-commit (Husky + lint-staged):

```jsonc
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"],
  },
}
```

CI pipeline enforces:

- `typecheck` - All workspaces
- `lint` - ESLint with `--max-warnings=0`
- `format:check` - Prettier validation
- `test:coverage` - Vitest with 80%/75% thresholds
- `audit-ci` - Dependency security scan
- `repo:check` - Workspace naming validation

## Documentation Structure

Comprehensive docs in `docs/` directory:

- `README.md` - Overview & quick start
- `CONTRIBUTING.md` - Dev guidelines, commit conventions (Conventional Commits)
- `DEPLOYMENT.md` - Build/release process, signing, notarization setup
- `ARCHITECTURE.md` - System design, rationale, diagrams, IPC patterns, data model
- `TROUBLESHOOTING.md` - Common issues and solutions

CHANGELOG automation:

```bash
npm run changelog  # Generates from conventional commits
```
