// import utils
import { z } from 'zod';

// Schemas
export const Theme = z.enum(['light', 'dark']);
export const Settings = z.object({
  theme: Theme,
  updatedAt: z.string().datetime(),
});
export const SettingsUpdateInput = z.object({ theme: Theme });

export const AppInfo = z.object({
  version: z.string(),
  platform: z.string(),
  arch: z.string(),
});

export const OpenDialogOptions = z.object({
  filters: z
    .array(
      z.object({
        name: z.string(),
        extensions: z.array(z.string()),
      })
    )
    .optional(),
});

export const OpenDialogResult = z.object({
  filePaths: z.array(z.string()),
});

// Types
export type Theme = z.infer<typeof Theme>;
export type Settings = z.infer<typeof Settings>;
export type SettingsUpdateInput = z.infer<typeof SettingsUpdateInput>;
export type AppInfo = z.infer<typeof AppInfo>;
export type OpenDialogOptions = z.infer<typeof OpenDialogOptions>;
export type OpenDialogResult = z.infer<typeof OpenDialogResult>;
