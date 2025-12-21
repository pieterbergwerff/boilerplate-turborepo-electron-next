# Deployment Guide

## Build Process

### Prerequisites

- Node.js 24.x
- Platform-specific build tools:
  - **Windows**: None (electron-builder handles everything)
  - **macOS**: Xcode Command Line Tools
  - **Linux**: `libgconf-2-4`, `libgtk-3-0`

### Local Build

```bash
# Build all packages
npm run build

# Build Next.js standalone
npm run build:next

# Package Electron application
npm run build:electron
```

Build artifacts appear in `apps/desktop/dist/`.

### Build Outputs

**Windows**: `Turborepo Electron Next-1.0.0-x64.exe` (NSIS installer)
**macOS**: `Turborepo Electron Next-1.0.0-x64.dmg`, `Turborepo Electron Next-1.0.0-arm64.dmg`
**Linux**: `Turborepo Electron Next-1.0.0-x64.AppImage`, `Turborepo Electron Next-1.0.0-x64.deb`

## Code Signing

### macOS Signing & Notarization

Required environment variables:

```bash
APPLE_ID=your-apple-id@example.com
APPLE_APP_SPECIFIC_PASSWORD=your-app-specific-password
APPLE_TEAM_ID=your-team-id
```

Setup:

1. Generate App-Specific Password in Apple ID settings
2. Get Team ID from Apple Developer portal
3. Add to CI secrets or local `.env`

The `scripts/afterSign.mjs` hook handles notarization automatically when credentials are present.

### Windows Signing

Required environment variables:

```bash
WINDOWS_CERT_BASE64=<base64-encoded-pfx>
WINDOWS_CERT_PASSWORD=<certificate-password>
```

electron-builder will sign the executable if these are set.

### Linux

No signing required for Linux builds.

## CI/CD Pipeline

### GitHub Actions Workflows

**Quality** (`.github/workflows/quality.yml`)

- Runs on every push/PR
- TypeScript compilation
- ESLint (0 warnings)
- Prettier formatting check
- Test coverage (80%/75% thresholds)
- Security audit via `audit-ci`

**Build & Release** (`.github/workflows/build.yml`)

- Triggers on version tags (`v*`)
- Matrix builds: Windows, macOS, Linux
- Uploads artifacts to GitHub Release

**E2E** (`.github/workflows/e2e.yml`)

- Runs Playwright tests
- Validates Electron packaging

### Required Secrets

Add to GitHub repository settings → Secrets:

```
APPLE_ID
APPLE_APP_SPECIFIC_PASSWORD
APPLE_TEAM_ID
WINDOWS_CERT_BASE64
WINDOWS_CERT_PASSWORD
```

## Release Process

### 1. Prepare Release

```bash
# Update version
npm version [major|minor|patch]

# Generate changelog
npm run changelog

# Review changes
git diff CHANGELOG.md
```

### 2. Tag and Push

```bash
# Commit version bump
git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: release vX.Y.Z"

# Create tag
git tag vX.Y.Z

# Push with tags
git push --follow-tags
```

### 3. CI Build

GitHub Actions will:

1. Run quality checks
2. Build for all platforms
3. Sign and notarize (if secrets present)
4. Create GitHub Release with artifacts

### 4. Publish Release

1. Go to GitHub Releases
2. Edit the auto-created release
3. Add release notes
4. Mark as latest release
5. Publish

## Rollback

If a release has critical issues:

```bash
# Create hotfix from previous tag
git checkout v1.2.3
git checkout -b hotfix/critical-fix

# Make fix
# ... commit changes ...

# Create patch release
npm version patch
git push --follow-tags
```

## Environment-Specific Configuration

### Development

```bash
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
```

Next.js runs in dev mode, Electron connects to `localhost:3000`.

### Production

Next.js output is `standalone`, served in-process by Electron via custom protocol. No external server needed.

## Database Migrations

Seed database generated during build:

```bash
# Generate seed DB
npm --workspace @packages/database run db:seed
```

On first launch, app copies seed DB from `process.resourcesPath` to `app.getPath('userData')`.

Migrations run idempotently on every app start.

## Troubleshooting Builds

### Build Failures

**"Cannot find module"**

- Rebuild packages: `npm run build`
- Check `node_modules`: `npm ci`

**Electron packaging fails**

- Check `electron-builder.yml` paths
- Verify `.next/standalone/` exists

**Signing fails (macOS)**

- Verify credentials are correct
- Check certificate validity
- Review notarization logs

**Windows build fails**

- Ensure NSIS is installed (comes with electron-builder)
- Check certificate format

### Performance Issues

**Large bundle size**

- Use bundle analyzer: `ANALYZE=true npm run build:next`
- Check for duplicate dependencies
- Review `transpilePackages` in `next.config.ts`

**Slow builds**

- Enable Turborepo remote cache
- Check `.turbo/` cache directory
- Use `--filter` to build specific packages

## Distribution

### Manual Distribution

Upload artifacts to:

- GitHub Releases (recommended)
- Company CDN
- Custom download portal

### Auto-Update (Future)

Currently not implemented. See `electron-updater` for future integration.

## Monitoring

### Build Metrics

Track in CI:

- Build time per platform
- Artifact sizes
- Test coverage trends
- Security audit results

### User Metrics

Implement optional telemetry:

- App version distribution
- Platform breakdown
- Crash reports (via Sentry or similar)
