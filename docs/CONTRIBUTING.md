# Contributing Guide

## Development Setup

### Prerequisites

- **Node.js 24.x** (use `.nvmrc` file with `nvm use`)
- **npm 10+** (comes with Node.js)

### Installation

```bash
# Clone repository
git clone <repo-url>
cd boilerplate-turborepo-electron-next

# Install dependencies
npm install

# Setup git hooks
npm run prepare
```

## Workspace Naming Convention

**Critical**: Package names must follow `@folder/workspace` pattern:

- `@apps/app` - Next.js application
- `@packages/ui` - UI component library
- `@config/typescript` - TypeScript configs
- `@utils/common` - Common utilities
- `@tests/vitest` - Vitest workspace

Validate naming: `npm run repo:check`

## Development Workflow

### Starting Development

```bash
# Start all dev servers
npm run dev

# Start individual apps
npm run dev:app       # Next.js only
npm run dev:desktop   # Electron only (requires Next.js running)
```

### Making Changes

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes following code standards
3. Run quality checks: `npm run quality`
4. Commit with conventional commits (see below)
5. Push and create PR

### Code Standards

#### Import Grouping

Every file must organize imports in this order:

```typescript
// import utils
import path from 'node:path';
// import constants
const DB_FILE = 'app.sqlite';
// import components
import { Button } from '@packages/ui';
// import types
import type { Settings } from '@packages/validators';
```

#### JSDoc Requirement

Every function must have JSDoc:

```typescript
/**
 * Fetch current settings from database.
 * @param {Knex} knex Knex instance
 * @returns {Promise<Settings>} Validated settings object
 */
export async function getSettings(knex: Knex): Promise<Settings> {
  // implementation
}
```

#### TypeScript Rules

- **No `any` allowed** - Use proper types
- **Strict mode** - `noImplicitAny`, `exactOptionalPropertyTypes`
- **ESM imports** - Use `.js` extensions: `import { foo } from './bar.js'`

### Testing

Write tests for all new features:

```bash
# Unit tests
npm run test:unit

# E2E tests
npm run test:e2e

# Watch mode
npm run test:ui
```

Test files go in `tests/*` workspaces, not in `apps/*`.

## Commit Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add theme toggle to settings page
fix: resolve database migration issue
docs: update architecture diagram
chore: bump dependencies
test: add integration tests for IPC handlers
```

Types:

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style changes
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance tasks

## Pull Request Process

1. Update tests and documentation
2. Ensure `npm run quality` passes
3. Ensure `npm run test` passes
4. Update CHANGELOG if needed
5. Request review from maintainers

### PR Checklist

- [ ] Code follows style guidelines
- [ ] JSDoc added for new functions
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Conventional commits used
- [ ] Quality checks pass
- [ ] No merge conflicts

## Release Process

Releases are automated via GitHub Actions:

1. Update version: `npm version [major|minor|patch]`
2. Update CHANGELOG: `npm run changelog`
3. Commit and tag: `git push --follow-tags`
4. CI builds and publishes artifacts

## Troubleshooting

### Common Issues

**Electron won't start**

- Ensure Next.js dev server is running on port 3000
- Check `apps/desktop/dist/` exists after build

**TypeScript errors**

- Run `npm run typecheck` to see all errors
- Check `tsconfig.json` extends correct base

**Tests failing**

- Clear coverage: `rm -rf tests/vitest/coverage`
- Rebuild packages: `npm run build`

## Getting Help

- Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- Review [ARCHITECTURE.md](ARCHITECTURE.md)
- Open an issue with reproduction steps
