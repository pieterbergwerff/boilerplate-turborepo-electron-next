# @packages/types

Shared TypeScript type definitions used across the monorepo.

## Electron Window Types

This package includes centralized type definitions for the Electron `window.api` object that's exposed to the renderer process via `contextBridge` in the preload script.

### Usage

To use the Electron window types in your package or app, simply import the types file:

```typescript
// In your type definition file (e.g., window.d.ts)
import '@packages/types/electron.js';
```

This will augment the global `Window` interface with the `api` property, making `window.api` available with full type safety throughout your application.

### Available API Methods

The `window.api` object provides the following methods:

- **`getSettings()`**: Retrieves current application settings
- **`setTheme(theme: 'light' | 'dark')`**: Updates the application theme
- **`getAppInfo()`**: Gets application version, platform, and architecture information
- **`openDialog(options?)`**: Opens a native file picker dialog

All methods are fully typed with their request/response types imported from `@packages/validators`.

### Architecture

- **Source**: [electron.d.ts](./src/electron.d.ts)
- **Pattern**: Global Window interface augmentation using `declare global`
- **Validation**: All IPC payloads validated with Zod schemas from `@packages/validators`
- **Re-exported**: The `ElectronApi` type is also exported from the main package entry point

### Example

```typescript
// apps/app/src/types/window.d.ts
import '@packages/types/electron.js';

// Now window.api is available everywhere in the app
const settings = await window.api?.getSettings();
await window.api?.setTheme('dark');
```

## Other Types

This package also exports shared types for:

- Store interfaces (`@packages/types/store`)
- Common data structures
- Utility types

Refer to [index.ts](./src/index.ts) for the complete list of exported types.
