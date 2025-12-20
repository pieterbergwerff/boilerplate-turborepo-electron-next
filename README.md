# Turborepo + Electron + Next.js Boilerplate

This is a monorepo setup using **Turborepo v2.3.4** with Electron and Next.js applications. This repository has been restructured for optimal workspace organization.

## 🚀 Features

- **Turborepo v2.3.4** with latest features (TUI, incremental builds, remote caching)
- **Next.js 16.1.0** with React 19 and App Router
- **Electron 39.2.7** with TypeScript support
- **Vitest** for testing with React Testing Library
- **TypeScript** with shared configurations
- **ESLint** and **Prettier** for code quality
- **GitHub Actions** CI/CD pipeline
- **Workspaces** for proper monorepo management

## 📁 Structure

```
├── apps/
│   ├── app/         # Next.js application (for both web and Electron)
│   └── desktop/     # Electron application
├── packages/
│   ├── tests/       # Centralized testing workspace
│   └── ui/          # Shared UI components
├── config/
│   ├── typescript/  # Shared TypeScript configurations
│   ├── eslint/      # Shared ESLint configurations
│   └── prettier/    # Shared Prettier configurations
├── .github/
│   └── workflows/   # GitHub Actions CI/CD
├── turbo.json       # Turborepo configuration
└── package.json     # Root package.json with workspaces
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

### Root Level Commands

- `npm run dev` - Start development for all apps
- `npm run build` - Build all apps for production
- `npm run clean` - Clean all build artifacts
- `npm run typecheck` - Type check all packages
- `npm run lint` - Lint all packages
- `npm run test` - Run tests across all packages
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run quality` - Run typecheck + lint + format:check
- `npm run quality:fix` - Run format + lint:fix + typecheck

### Specific App Commands

- `npm run dev:web` - Start only the Next.js web app
- `npm run dev:desktop` - Start only the Electron desktop app
- `npm run build:next` - Build only the Next.js web app
- `npm run build:electron` - Build only the Electron desktop app

## 🏗 Apps

### Web App (Next.js)

- **Location**: `apps/web`
- **Port**: http://localhost:3000 in development
- **Features**: Next.js 16 with App Router, React 19, Vitest testing
- **Build**: Creates standalone build for Electron consumption

### Desktop App (Electron)

- **Location**: `apps/desktop`
- **Features**: Electron 39 with TypeScript, next-electron-rsc integration
- **Development**: Loads Next.js app from localhost:3000
- **Production**: Loads from static Next.js build

## 📦 Packages

### UI Package

- **Location**: `packages/ui`
- **Purpose**: Shared React components
- **Usage**: Imported by both web and desktop apps

### TypeScript Config

- **Location**: `packages/typescript-config`
- **Purpose**: Shared TypeScript configurations
- **Configs**: Base, Next.js, and React library configurations

## 🔧 Turborepo Configuration

This setup leverages Turborepo's latest features:

- **Task Pipeline**: Optimized build dependencies with `^build` patterns
- **Incremental Builds**: Only rebuild what changed
- **Parallel Execution**: Run tasks across packages simultaneously
- **TUI Interface**: Modern terminal UI for better visibility
- **Remote Caching**: Ready for team-wide build caching (configure `TURBO_TOKEN`)

### Key Turbo Tasks

- `build` - Builds applications with proper dependency order
- `dev` - Starts persistent development servers
- `test` - Runs test suites with coverage output
- `type-check` - Validates TypeScript across all packages
- `lint` - Code quality checking
- `clean` - Cleanup build artifacts

## 🧪 Testing

- **Framework**: Vitest with React Testing Library
- **Location**: Tests are in `src/test/` directories
- **Commands**:
  - `npm run test` - Run all tests
  - `npm run test:coverage` - Run tests with coverage
  - `npm run test:ui` - Run tests with UI (watch mode)

## 🎨 Code Quality

### Prettier

- **Config**: `.prettierrc` with standardized formatting rules
- **Ignore**: `.prettierignore` for excluding files

### ESLint

- **Config**: Modern flat config in `eslint.config.js`
- **Rules**: TypeScript, React, and accessibility rules
- **Note**: Currently simplified to avoid compatibility issues

### TypeScript

- **Shared configs** in `packages/typescript-config`
- **Strict mode** disabled for compatibility
- **Path mapping** for monorepo imports

## 🚀 Deployment

### CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci-cd.yml`) includes:

- **Node.js 24** testing matrix
- **Security scanning** with CodeQL
- **Quality checks** (lint, typecheck, format)
- **Test execution** with coverage
- **Build verification**
- **Turbo caching** support (configure secrets)

### Production Build

1. **Web app**: `npm run build:next` creates standalone build
2. **Desktop app**: `npm run build:electron` compiles TypeScript
3. **Electron packaging**: Use `electron-builder` with `electron-builder.yml`

## 🔧 Configuration Files

- `turbo.json` - Turborepo task pipeline configuration
- `package.json` - Root package with workspaces
- `tsconfig.json` - Individual TypeScript configs per package
- `electron-builder.yml` - Electron packaging configuration
- `.nvmrc` - Node.js version specification (24)
- `.prettierrc` - Code formatting rules

## 🛡 Environment

- **Node.js**: >=24.0.0
- **npm**: >=10.0.0
- **Package Manager**: npm with workspaces
- **Electron**: 39.2.7
- **Next.js**: 16.1.0
- **React**: 19.1.0
- **TypeScript**: 5.8.3
- **Turborepo**: 2.3.4

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and ensure quality checks pass: `npm run quality`
4. Run tests: `npm run test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

---

**Built with ❤️ using Turborepo, Next.js, and Electron**
