# Turborepo + Electron + Next.js Boilerplate

A production-ready monorepo boilerplate using **Turborepo v2.7.0** with Electron and Next.js, featuring comprehensive testing, cross-platform builds, and a fully automated CI/CD pipeline.

## ✨ Highlights

- ✅ **100% Green CI/CD Pipeline** - Pre-flight checks, security scanning, quality gates, testing, and multi-OS builds
- ⚡ **Optimized ASAR Packaging** - Single archive bundling for faster loading and improved security
- 🧪 **Comprehensive Testing** - Vitest unit/integration tests + Playwright E2E with 80%+ coverage thresholds
- 📚 **TypeDoc API Documentation** - Auto-generated API docs with JSDoc enforcement
- 🔒 **Security First** - Audit scanning, sandboxed Electron renderer, CSP headers, IPC validation

## 🚀 Features

- **Turborepo v2.7.0** with latest features (TUI, incremental builds, remote caching)
- **Next.js 16.1.0** with React 19 and App Router + Server Components
- **Electron 39.2.0** with `next-electron-rsc` integration and SQLite database
- **Vitest** for unit/integration testing with React Testing Library
- **Playwright** for E2E testing of desktop workflows
- **TypeScript 5.8+** with strict mode and shared configurations
- **ESLint & Prettier** with flat config and automated formatting
- **Tailwind CSS 4.1** with modern PostCSS pipeline
- **Storybook** for component development and documentation
- **GitHub Actions** CI/CD with matrix builds (Windows/macOS/Linux)
- **ASAR Packaging** for optimized Electron app distribution
- **TypeDoc** for comprehensive API documentation
- **Workspaces** with strict `@folder/workspace` naming convention

## 📁 Structure

```
├── apps/
│   ├── app/         # Next.js 16 application (App Router, React 19)
│   ├── desktop/     # Electron 39 application with next-electron-rsc
│   ├── storybook/   # Storybook for component development
│   ├── tests/       # Vitest UI runner (legacy)
│   └── docs/        # TypeDoc API documentation generation
├── packages/
│   ├── ui/          # Shared React component library (atomic design)
│   ├── hooks/       # Shared React hooks (useTheme, useSettings)
│   ├── database/    # SQLite3 + Knex (migrations, seeds, repositories)
│   ├── validators/  # Zod schemas/types (IPC validation)
│   ├── fonts/       # Font files (Cantarell, IBM Plex, Inter, Roboto)
│   ├── types/       # Shared TypeScript types/interfaces
│   ├── scripts/     # Build scripts (afterSign, workspace validation)
│   └── tests/       # Shared Vitest test utilities
├── config/
│   ├── typescript/  # Shared TypeScript configurations
│   ├── eslint/      # Shared ESLint configurations (flat config)
│   ├── prettier/    # Shared Prettier configurations
│   └── tailwind/    # Shared Tailwind CSS 4.1 configuration
├── utils/
│   ├── common/      # Cross-environment utilities
│   ├── client/      # Client-only utilities
│   └── server/      # Server-only utilities
├── tests/
│   ├── vitest/      # Unit/integration tests (centralized)
│   └── playwright/  # E2E tests (centralized)
├── docs/            # Generated TypeDoc API documentation (HTML)
├── .github/
│   └── workflows/   # GitHub Actions CI/CD pipeline
├── turbo.json       # Turborepo task orchestration
└── package.json     # Root package.json with npm workspaces
```

## 🛠 Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development:**

   ```bash
   npm run dev
   ```

   This starts both the Next.js web app and Electron desktop app.

3. **Build all applications:**
   ```bash
   npm run build
   ```

## 📜 Available Scripts

### Development

- `npm run dev` - Start all apps (Next.js, Electron, Storybook, Vitest UI) with logs prefixed per task
- `npm run dev:app` - Start only Next.js dev server (port 3000)
- `npm run dev:desktop` - Start only Electron (requires Next.js running first)

### Building

- `npm run build` - Build all packages/apps (Turborepo orchestrates order)
- `npm run build:next` - Build Next.js standalone (`.next/standalone/`)
- `npm run build:electron` - TypeScript compile + electron-builder packaging

### Testing

- `npm run test` - All tests (Vitest unit/integration + Playwright E2E)
- `npm run test:unit` - Unit tests with coverage (80%+ thresholds)
- `npm run test:e2e` - Playwright E2E for Electron workflows
- `npm run test:coverage` - Run tests with coverage reports
- `npm run test:ui` - Vitest interactive watch mode

### Quality Checks

- `npm run quality` - Run typecheck + lint + format:check (CI equivalent)
- `npm run quality:fix` - Auto-fix formatting and lint issues
- `npm run typecheck` - TypeScript validation across all packages
- `npm run lint` - ESLint with max-warnings=0
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without fixing

### Documentation

- `npm run docs` - Generate TypeDoc API documentation (outputs to `docs/`)
- `npm run docs:watch` - Generate docs in watch mode
- `npm run changelog` - Generate changelog from conventional commits

### Utilities

- `npm run clean` - Clean all build artifacts and caches
- `npm run repo:check` - Validate workspace naming follows `@folder/workspace` convention

## 🏗 Apps

### Next.js App (`apps/app`)

- **Port**: http://localhost:3000 in development
- **Features**: Next.js 16 with App Router, React 19, Server Components, Tailwind CSS 4.1
- **Build**: Creates `standalone` build for Electron consumption (no open ports in production)
- **Integration**: `next-electron-rsc` for in-process Next.js rendering
- **Dynamic Routes**: Any route using Electron/Node APIs must have `export const dynamic = 'force-dynamic'`

### Electron Desktop App (`apps/desktop`)

- **Module System**: CommonJS (required for preload scripts)
- **Architecture**: Main process (Node.js) + Renderer (Chrome) with context isolation
- **Database**: SQLite3 + Knex with migrations, seeds, typed repositories
- **IPC**: Typed channels validated with Zod schemas from `@packages/validators`
- **Development**: Loads Next.js from localhost:3000 with HMR
- **Production**: Loads from ASAR-packaged Next.js standalone build
- **Security**: `sandbox: true`, `contextIsolation: true`, `nodeIntegration: false`, CSP headers
- **Packaging**: electron-builder with ASAR packaging (`app.asar` + `app.asar.unpacked/`)

### Storybook (`apps/storybook`)

- **Purpose**: Component development and documentation for `@packages/ui`
- **Features**: CSF3 stories, Tailwind CSS 4.1, composition support
- **Access**: Run `npm run dev` and navigate to Storybook port

## 📦 Packages

### UI Package (`@packages/ui`)

- **Organization**: Atomic design (atoms/molecules/organisms/pages/templates)
- **Styling**: Tailwind CSS 4.1 utility classes
- **Exports**: Named exports only (no default exports) for tree-shaking
- **Usage**: Imported by Next.js, Electron renderer, and Storybook

### Database Package (`@packages/database`)

- **Stack**: SQLite3 + Knex for migrations and queries
- **Seed Strategy**: Build-time generation → runtime copy from `process.resourcesPath`
- **Repositories**: Typed services (getSettings, updateSettings) with Zod validation
- **Location**: Main process only (renderer uses IPC)

### Validators Package (`@packages/validators`)

- **Purpose**: Zod schemas shared across main/preload/renderer/Next
- **Patterns**: Export both schema (for validation) and type (for TypeScript)
- **Usage**: IPC payload validation, database model validation

### Hooks Package (`@packages/hooks`)

- **Purpose**: Shared React hooks (useTheme, useSettings, etc.)
- **Usage**: Consumed by Next.js, UI package, and Electron renderer

### Config Packages (`@config/*`)

- **TypeScript**: Base, Next.js, React library configs with strict mode
- **ESLint**: Flat config with TypeScript, React, a11y rules
- **Prettier**: Standardized formatting rules
- **Tailwind**: Shared Tailwind CSS 4.1 configuration

## 🔧 Turborepo Configuration

This setup leverages Turborepo v2.7.0's latest features:

- **Task Pipeline**: Optimized build dependencies with `^build` patterns
- **Incremental Builds**: Only rebuild what changed (content-based hashing)
- **Parallel Execution**: Run tasks across packages simultaneously
- **TUI Interface**: Modern terminal UI for real-time task monitoring
- **Remote Caching**: Ready for team-wide build caching (configure `TURBO_TOKEN`)
- **Workspace Naming**: Strict `@folder/workspace` convention enforced by `repo:check` script

### Key Turbo Tasks

- `build` - Builds applications with proper dependency order, outputs to `dist/` or `.next/`
- `dev` - Starts persistent development servers with `cache: false`
- `test` - Runs test suites with coverage output to `coverage/`
- `typecheck` - Validates TypeScript across all packages
- `lint` - Code quality checking with ESLint (no outputs)
- `format` - Auto-format with Prettier (`cache: false`)
- `clean` - Cleanup build artifacts

### Task Dependencies

Tasks use `^` prefix to depend on dependencies' tasks:

- `"dependsOn": ["^build"]` means "build dependencies first"
- Modify `turbo.json` outputs when changing build directories
- Use `cache: false` for persistent dev servers and formatting tasks

## 🧪 Testing

### Vitest (Unit/Integration)

- **Framework**: Vitest with React Testing Library
- **Location**: Centralized in `tests/vitest/` workspace (no tests in `apps/*`)
- **Coverage**: 80% lines/functions/statements, 75% branches (enforced)
- **Commands**:
  - `npm run test:unit` - Run unit tests with coverage
  - `npm run test:ui` - Interactive watch mode
  - `npm run test:coverage` - Generate coverage reports

### Playwright (E2E)

- **Framework**: Playwright for Electron desktop workflows
- **Location**: Centralized in `tests/playwright/` workspace
- **Scope**: Tests full Electron app lifecycle, IPC, database, window management
- **Commands**:
  - `npm run test:e2e` - Run E2E tests
  - Requires build artifacts from `build:electron` step

### Test Strategy

- **No tests in apps**: All tests consolidated in `tests/*` workspaces
- **Coverage includes**: `apps/*/src/**` and `packages/*/src/**`
- **CI enforcement**: All tests must pass with coverage thresholds met

## 🎨 Code Quality

### Prettier

- **Config**: Shared in `@config/prettier` package
- **Rules**: Standardized formatting (2-space indent, single quotes, trailing commas)
- **Automation**: Pre-commit hook via Husky + lint-staged
- **Commands**: `npm run format` (fix), `npm run format:check` (validate)

### ESLint

- **Config**: Modern flat config (`eslint.config.js`) with TypeScript, React, a11y rules
- **Strict Rules**: `@typescript-eslint/no-explicit-any: error` - **no `any` allowed**
- **Shared**: Extends `@config/eslint` package
- **Commands**: `npm run lint` (with `--max-warnings=0`), `npm run lint:fix`

### TypeScript

- **Shared configs**: In `@config/typescript` package (base, nextjs, react-library)
- **Strict mode**: Enabled - `noImplicitAny`, `exactOptionalPropertyTypes`, `strict: true`
- **Module System**: ESM (`nodenext`) with `.js` import extensions, **except** Electron desktop (CommonJS)
- **Import Extensions**: Always use `.js` extensions in imports (e.g., `'./utils.js'`) even for `.ts` files

### JSDoc Requirement

**Every function must have JSDoc** with description, params, and return type:

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

### Import Grouping (Enforced)

Every file must follow this order with blank line + comment separators:

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

### Git Hooks

- **Pre-commit**: lint-staged (prettier + eslint), repo:check, console.log prevention
- **Pre-push**: quality checks (typecheck + lint + format:check), docs generation

## 🚀 Deployment

### CI/CD Pipeline

**100% green pipeline** - GitHub Actions workflow (`.github/workflows/ci-cd.yml`) with comprehensive checks:

#### Job Matrix

1. **Pre-flight** (ubuntu-latest):
   - Dependency caching
   - Workspace structure validation
   - Repository health checks

2. **Security** (ubuntu-latest):
   - `audit-ci` with strict thresholds (blocks high/critical vulnerabilities)
   - Dependency security scanning

3. **Code Quality** (ubuntu-latest, macos-latest, windows-latest):
   - TypeScript validation (`npm run typecheck`)
   - ESLint with `--max-warnings=0`
   - Prettier format checking
   - Cross-platform compatibility validation

4. **Test Suite** (ubuntu-latest, macos-latest, windows-latest):
   - Vitest unit/integration tests
   - Coverage enforcement (80%/75% thresholds)
   - Cross-platform test validation

5. **Build & Package** (ubuntu-latest, macos-latest, windows-latest):
   - Next.js standalone build (`.next/standalone/`)
   - Electron ASAR packaging with native module unpacking
   - Artifact generation:
     - Windows: NSIS one-click installer (x64)
     - macOS: DMG (separate x64/arm64, signed & notarized when secrets provided)
     - Linux: AppImage + DEB (x64)

6. **E2E Tests** (ubuntu-latest):
   - Playwright tests using packaged artifacts
   - Full Electron app lifecycle validation

7. **Performance** (ubuntu-latest):
   - Build performance metrics
   - Bundle size tracking

### ASAR Packaging Benefits

- **Single Archive**: App bundled into `app.asar` for faster loading
- **Security**: Code obfuscation and tamper resistance
- **Performance**: Reduced file system overhead
- **Native Modules**: SQLite3 unpacked to `app.asar.unpacked/` for runtime access
- **Symlink Issues**: Eliminates macOS `.app` bundle symlink problems

### Production Build Steps

1. **Next.js standalone build**:

   ```bash
   npm run build:next
   # Creates .next/standalone/ with self-contained app
   ```

2. **Electron TypeScript compile + packaging**:

   ```bash
   npm run build:electron
   # Compiles TS → JS, runs electron-builder with ASAR packaging
   ```

3. **Artifacts**:
   - Windows: `apps/desktop/dist/MyApp Setup 1.0.0.exe`
   - macOS: `apps/desktop/dist/MyApp-1.0.0-arm64.dmg`, `MyApp-1.0.0-x64.dmg`
   - Linux: `apps/desktop/dist/MyApp-1.0.0.AppImage`, `MyApp_1.0.0_amd64.deb`

### Code Signing & Notarization

- **Windows**: Configure `CSC_LINK` and `CSC_KEY_PASSWORD` in CI secrets
- **macOS**: Configure `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD`, `APPLE_TEAM_ID` for notarization
- **Signing Script**: `packages/scripts/afterSign.mjs` handles macOS notarization via electron-builder hook

## 🔧 Configuration Files

- `turbo.json` - Turborepo task pipeline with dependency orchestration
- `package.json` - Root package with npm workspaces and scripts
- `tsconfig.json` - Individual TypeScript configs per package (extend shared configs)
- `eslint.config.js` - Flat config extending `@config/eslint`
- `electron-builder.yml` - Electron packaging with ASAR and platform-specific targets
- `.nvmrc` - Node.js version specification (24)
- `.prettierrc` - Code formatting rules in `@config/prettier`
- `postcss.config.mjs` - PostCSS with Tailwind CSS 4.1
- `tailwind.config.ts` - Tailwind configuration
- `.npmignore` - npm packaging exclusions
- `audit-ci.json` - Security scanning thresholds

## 🛡 Environment

- **Node.js**: >=24.0.0 (specified in `engines`, `.nvmrc`, CI)
- **npm**: >=10.0.0 with `engine-strict=true`
- **Package Manager**: npm workspaces (not pnpm/yarn)
- **Electron**: 39.2.0
- **Next.js**: 16.1.0
- **React**: 19.1.0
- **TypeScript**: 5.8.3+
- **Turborepo**: 2.7.0
- **Tailwind CSS**: 4.1.0
- **Vitest**: Latest with coverage support
- **Playwright**: Latest for E2E testing

## 📚 Documentation

### TypeDoc API Documentation

Auto-generated API documentation with comprehensive JSDoc coverage:

```bash
npm run docs        # Generate TypeDoc HTML to docs/
npm run docs:watch  # Generate docs in watch mode
```

View generated documentation: Open [`docs/index.html`](docs/index.html) in a browser

**Documentation Standards**:

- Every function must have JSDoc with description, `@param`, and `@returns`
- Pre-push hook automatically regenerates docs
- Coverage includes all packages and apps

### Project Documentation

Comprehensive guides in `apps/docs/`:

- [`README.md`](apps/docs/README.md) - Overview & quick start
- [`CONTRIBUTING.md`](apps/docs/CONTRIBUTING.md) - Dev guidelines, commit conventions (Conventional Commits)
- [`DEPLOYMENT.md`](apps/docs/DEPLOYMENT.md) - Build/release process, signing, notarization setup
- [`ARCHITECTURE.md`](apps/docs/ARCHITECTURE.md) - System design, rationale, diagrams, IPC patterns
- [`TROUBLESHOOTING.md`](apps/docs/TROUBLESHOOTING.md) - Common issues and solutions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and ensure quality checks pass: `npm run quality`
4. Run tests: `npm run test`
5. Ensure workspace naming follows `@folder/workspace`: `npm run repo:check`
6. Commit with Conventional Commits format: `git commit -m 'feat: add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Commit Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build/tooling changes

### Pre-commit Checks

Husky hooks automatically run:

- **Pre-commit**: Prettier + ESLint on staged files, workspace name validation, console.log check
- **Pre-push**: Full quality checks (typecheck + lint + format:check), TypeDoc generation

### Code Standards

- **No `any`**: TypeScript strict mode enforced with ESLint rule
- **JSDoc required**: Every function must have JSDoc comments
- **Import grouping**: Follow utils → constants → components → types pattern
- **Named exports**: No default exports (tree-shaking optimization)
- **Tailwind CSS**: Use utility classes for styling (no inline styles)

## 📄 License

This project is licensed under the ISC License.

---

**Built with ❤️ using Turborepo, Next.js, and Electron**
