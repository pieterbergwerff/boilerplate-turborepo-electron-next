# Architecture

## System Overview

This boilerplate implements a cross-platform desktop application using Electron with Next.js Server Components running in-process via `next-electron-rsc`. The architecture ensures offline functionality, type safety, and maintainable code organization.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Electron Main Process              │
│  ┌──────────────┐  ┌────────────┐  ┌────────────┐  │
│  │ Window Mgmt  │  │ IPC Router │  │ DB Service │  │
│  └──────────────┘  └────────────┘  └────────────┘  │
│         │                 │               │         │
│         │                 │               │         │
│  ┌──────▼─────────────────▼───────────────▼──────┐ │
│  │      next-electron-rsc Handler               │ │
│  │  (Next.js running in-process, no network)    │ │
│  └───────────────────────────┬──────────────────┘ │
└────────────────────────────── ┼ ───────────────────┘
                                │
                      custom protocol
                                │
┌───────────────────────────────▼────────────────────┐
│              Electron Renderer (Chromium)          │
│  ┌──────────────────────────────────────────────┐  │
│  │         Next.js App Router                   │  │
│  │  ┌────────────┐    ┌──────────────────────┐ │  │
│  │  │   Pages    │    │  Server Components   │ │  │
│  │  │  (Client)  │◄───│  (run on main proc)  │ │  │
│  │  └────────────┘    └──────────────────────┘ │  │
│  └──────────────────────────────────────────────┘  │
│                       │                            │
│                    Preload API                     │
│                       │                            │
│  ┌─────────────────────────────────────────────┐   │
│  │       IPC Calls (Zod validated)            │   │
│  └─────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────┘
```

## Core Components

### 1. Electron Main Process

**Location**: `apps/desktop/src/main.ts`

Responsibilities:

- Create BrowserWindow with security settings
- Initialize database connection
- Setup next-electron-rsc handler
- Register IPC handlers
- Manage application lifecycle

Key features:

- Single-instance lock
- Menu integration
- Database migration on startup
- Preload script injection

### 2. IPC Layer

**Location**: `apps/desktop/src/ipc.ts`, `apps/desktop/src/preload.ts`

Responsibilities:

- Expose safe API to renderer
- Validate all payloads with Zod
- Route requests to services

Security:

- `contextIsolation: true`
- `sandbox: true`
- `nodeIntegration: false`
- Allowlisted channels only

IPC Channels:

- `app:get-info` - Application metadata
- `settings:get` - Fetch settings
- `settings:update` - Update settings
- `fs:openDialog` - Native file picker

### 3. Next.js Application

**Location**: `apps/app/`

Responsibilities:

- Render UI with React Server Components
- Handle client interactions
- Provide API routes for data operations

Key features:

- App Router with RSC
- Standalone output for Electron
- CSP headers for security
- No open network ports in production

### 4. Database Layer

**Location**: `packages/database/`

Responsibilities:

- SQLite connection management
- Schema migrations
- Typed data access

Architecture:

```
Main Process
    │
    ├── Knex Client
    │     │
    │     ├── Migrations (idempotent)
    │     │     └── settings table
    │     │
    │     └── Repositories (typed)
    │           ├── getSettings()
    │           └── updateSettings()
    │
    └── Seed DB (packaged resource)
```

Data flow:

1. Build: Generate seed DB with migrations
2. Package: Include seed as extra resource
3. Runtime: Copy seed to userData on first launch
4. Startup: Run migrations against runtime DB

### 5. Validation Layer

**Location**: `packages/validators/`

Responsibilities:

- Define Zod schemas
- Export TypeScript types
- Validate IPC payloads
- Validate database operations

Pattern:

```typescript
// Schema
export const Settings = z.object({
  theme: z.enum(['light', 'dark']),
  updatedAt: z.string().datetime(),
});

// Type
export type Settings = z.infer<typeof Settings>;
```

## Data Flow

### Settings Update Flow

```
1. User clicks theme button in Settings page (Client Component)
   │
   ├── Call window.api.setTheme('dark')
   │
2. Preload intercepts and invokes IPC
   │
   ├── ipcRenderer.invoke('settings:update', { theme: 'dark' })
   │
3. Main process IPC handler receives payload
   │
   ├── Validate with SettingsUpdateSchema.parse()
   │
4. Repository updates database
   │
   ├── knex('settings').update({ theme: 'dark', updated_at: ... })
   │
5. Return validated result
   │
   ├── SettingsSchema.parse(updated)
   │
6. Preload returns Promise<Settings> to renderer
   │
   └── UI updates with new theme
```

### Database Initialization Flow

```
1. App launch
   │
   ├── Check if DB exists in userData
   │
   ├── NO? Copy seed DB from resources
   │      │
   │      └── copyFileSync(resourcesPath/app.sqlite, userData/app.sqlite)
   │
2. Create Knex client
   │
   └── createDb(userData/app.sqlite)
        │
3. Run migrations (idempotent)
   │
   └── runMigrations(knex, dbPath)
        │
        ├── Check if tables exist
        ├── Create if missing
        └── Seed initial data
```

## Security Architecture

### Electron Security

1. **Sandboxed Renderer**
   - `sandbox: true`
   - No direct Node.js access
   - All APIs via preload

2. **Context Isolation**
   - `contextIsolation: true`
   - Separate JS contexts
   - `contextBridge` for API exposure

3. **Content Security Policy**
   - Strict CSP headers in Next.js
   - No inline scripts
   - No eval()

4. **IPC Validation**
   - All payloads validated with Zod
   - Type-safe end-to-end
   - Fail-fast on invalid data

### Next.js Security

1. **Server Components**
   - Sensitive logic stays on server (main process)
   - No client-side secrets
   - Direct database access safe

2. **CSP Headers**
   ```typescript
   ("default-src 'self'",
     "script-src 'self'",
     "style-src 'self' 'unsafe-inline'",
     "img-src 'self' data:",
     "connect-src 'self'",
     "frame-ancestors 'none'");
   ```

## Monorepo Structure

### Workspace Organization

```
root/
├── apps/           - Runnable applications
│   ├── app/        - Next.js (consumed by desktop)
│   ├── desktop/    - Electron main process
│   └── storybook/  - Component development
├── packages/       - Shared libraries
│   ├── ui/         - React components
│   ├── database/   - DB logic
│   └── validators/ - Zod schemas
├── config/         - Shared configs
│   ├── typescript/ - TS configs
│   ├── eslint/     - Lint rules
│   └── prettier/   - Format rules
├── utils/          - Utility functions
│   ├── common/     - Cross-environment
│   ├── client/     - Browser-only
│   └── server/     - Node-only
└── tests/          - Test workspaces
    ├── vitest/     - Unit/integration
    └── playwright/ - E2E
```

### Dependency Graph

```
desktop ──┬──> app ──┬──> ui ──────> (React)
          │          ├──> validators
          │          └──> (Next.js)
          │
          ├──> database ──> validators
          ├──> validators
          └──> next-electron-rsc

vitest ───> ui, validators, tests

playwright ──> desktop (E2E)
```

## Build Pipeline

### Development Flow

```
1. npm run dev
   │
   ├── Next.js dev server (port 3000)
   │   └── HMR enabled
   │
   ├── Electron (tsc-watch)
   │   └── Connects to localhost:3000
   │
   └── Storybook (optional)
       └── Component development
```

### Production Flow

```
1. npm run build
   │
   ├── Build packages (Turborepo)
   │   ├── validators
   │   ├── database
   │   ├── ui
   │   └── utils
   │
   ├── Build Next.js
   │   └── output: 'standalone'
   │       └── .next/standalone/
   │
   ├── Build Electron
   │   └── tsc → dist/
   │
   └── Generate seed DB
       └── packages/database/seed/app.sqlite

2. npm run build:electron
   │
   └── electron-builder
       ├── Package Next standalone
       ├── Package Electron dist
       ├── Include seed DB as resource
       ├── Sign (if secrets present)
       └── Create installers
```

## Performance Considerations

### Cold Start Optimization

- Seed DB pre-migrated (no migration on first start)
- Standalone Next.js (minimal runtime)
- No external network calls

### Runtime Optimization

- Turborepo caching for builds
- Next.js static optimization
- SQLite indexes on frequently queried columns

### Memory Management

- Single DB connection per app instance
- Knex connection pooling (size: 1)
- Clean up IPC listeners on unmount

## Extension Points

### Adding New IPC Channels

1. Define schema in `packages/validators/`
2. Add handler in `apps/desktop/src/ipc.ts`
3. Expose in `apps/desktop/src/preload.ts`
4. Use from Next.js client components

### Adding Database Tables

1. Update migrations in `packages/database/src/index.ts`
2. Create repository functions
3. Update seed generation script
4. Use from Next.js Server Components or IPC

### Adding New Pages

1. Create page in `apps/app/src/app/`
2. Use Server Components by default
3. Add 'use client' only when needed
4. Access DB directly from Server Components

## Rationale

### Why next-electron-rsc?

- No open network ports in production
- True offline capability
- Server Components work seamlessly
- Simpler architecture than separate server

### Why SQLite?

- Local-first application
- No server required
- Type-safe with Knex
- Easy migration and seeding

### Why Monorepo?

- Shared code between Electron and Next.js
- Consistent tooling and dependencies
- Faster iteration with Turborepo caching
- Better code organization

### Why Strict TypeScript?

- Catch errors at compile time
- Better IDE support
- Safer refactoring
- No `any` means no surprises
