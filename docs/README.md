# Turborepo-Electron-Next.js Boilerplate

A production-ready Turborepo monorepo boilerplate that ships a cross-platform Electron desktop application (Windows/macOS/Linux) powered by Next.js 16+ with App Router and Server Components.

## Features

- **Turborepo v2** - Fast monorepo build system with intelligent caching
- **Electron 39** - Cross-platform desktop framework
- **Next.js 16+** - React framework with App Router and Server Components
- **next-electron-rsc** - Seamless Next.js integration in Electron (no open ports in production)
- **TypeScript Strict Mode** - Type safety with `noImplicitAny` enforced
- **SQLite + Knex** - Local database with typed repositories
- **Zod Validation** - Runtime validation for IPC and database operations
- **ESM-only** - Modern module system throughout
- **Vitest + Playwright** - Unit, integration, and E2E testing
- **Shared Configs** - Centralized TypeScript, ESLint, and Prettier configurations
- **CI/CD Ready** - GitHub Actions workflows for quality, testing, and releases

## Quick Start

```bash
# Install dependencies
npm install

# Start development (Next.js + Electron + Storybook + Vitest)
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Type check
npm run typecheck

# Lint
npm run lint

# Format
npm run format
```

## Project Structure

```
apps/
  app/          - Next.js application (App Router, RSC)
  desktop/      - Electron main process + IPC handlers
  storybook/    - Component development environment
  tests/        - (legacy) Vitest UI runner
packages/
  ui/           - Shared React component library (atomic design)
  tests/        - Shared test utilities
  database/     - SQLite + Knex with typed repositories
  validators/   - Zod schemas shared across layers
config/
  typescript/   - Shared TypeScript configurations
  eslint/       - Shared ESLint configuration
  prettier/     - Shared Prettier configuration
utils/
  common/       - Cross-environment utilities
  client/       - Client-only utilities
  server/       - Server-only utilities
tests/
  vitest/       - Unit and integration tests
  playwright/   - E2E tests for Electron
```

## Development Workflow

### Running in Development

The `npm run dev` command starts all development processes:

- Next.js dev server on `localhost:3000` (with HMR)
- Electron connecting to dev server
- Storybook for component development
- Vitest UI for interactive testing

### Building for Production

```bash
# Build all packages
npm run build

# Build Next.js standalone
npm run build:next

# Package Electron application
npm run build:electron
```

The build process:

1. Compiles TypeScript for all workspaces
2. Creates Next.js standalone build
3. Generates seed database
4. Packages Electron with electron-builder

### Cross-Platform Packaging

**Windows**: NSIS one-click installer (x64)
**macOS**: DMG (separate x64 and arm64 builds)
**Linux**: AppImage + DEB (x64)

## Architecture

### Next.js ↔ Electron Integration

Uses `next-electron-rsc` for seamless integration:

- **Development**: Next dev server + HMR on `localhost:3000`
- **Production**: Next standalone served in-process via Electron protocol (fully offline)

### Database Strategy

SQLite3 + Knex in main process:

1. **Seed DB**: Generated during build via migrations
2. **Runtime**: Copied to `userData` on first launch
3. **Migrations**: Run idempotently on app startup
4. **Access**: Via typed repositories (direct from Next Server Components/Route Handlers, or via IPC from renderer)

### IPC Design

All IPC validated with Zod:

- `app:get-info` - Get application metadata
- `settings:get` - Fetch current settings
- `settings:update` - Update theme setting
- `fs:openDialog` - Open native file picker

Security:

- `contextIsolation: true`
- `sandbox: true`
- `nodeIntegration: false`
- Allowlisted channels only

## Coding Standards

### TypeScript

- **Strict mode** enforced (`noImplicitAny`, `exactOptionalPropertyTypes`)
- **No `any` allowed** - ESLint rule blocks usage
- **ESM-only** - Use `.js` extensions in imports

### Code Organization

Every file follows this import order:

1. Utils (e.g., `path`, `fs`)
2. Constants
3. Components
4. Types
5. Other

### JSDoc Requirement

Every function must have JSDoc:

```typescript
/**
 * Description of what the function does.
 * @param {Type} paramName Parameter description
 * @returns {ReturnType} Return value description
 */
export function myFunction(paramName: Type): ReturnType {
  // implementation
}
```

## Testing

```bash
# All tests
npm test

# Unit tests with coverage
npm run test:unit

# E2E tests
npm run test:e2e

# Interactive test UI
npm run test:ui

# Coverage report
npm run test:coverage
```

Coverage thresholds: 80% lines/functions/statements, 75% branches

## Quality Checks

```bash
# Run all checks (typecheck + lint + format)
npm run quality

# Auto-fix issues
npm run quality:fix

# Validate workspace naming
npm run repo:check
```

CI enforces:

- TypeScript compilation
- ESLint (0 warnings)
- Prettier formatting
- Test coverage thresholds
- Security audits via `audit-ci`

## Environment Variables

Create `.env` file (see `.env.example`):

```bash
PRODUCT_NAME=Turborepo Electron Next
APP_ID=com.example.turborepo.electron.next
NEXT_TELEMETRY_DISABLED=1
```

## Documentation

- [CONTRIBUTING.md](docs/CONTRIBUTING.md) - Development guidelines
- [DEPLOYMENT.md](docs/DEPLOYMENT.md) - Build and release process
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - System design and patterns
- [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) - Common issues

## License

MIT
