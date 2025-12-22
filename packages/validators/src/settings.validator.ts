// import utils
import { z } from 'zod';

// import validators
import ThemeValidator from './theme.validator.js';

export const SettingsValidator = z.object({
  theme: ThemeValidator,
  updatedAt: z.string().datetime(),
});

export type SettingsValidatorType = z.infer<typeof SettingsValidator>;

export const SettingsUpdateInputValidator = z.object({ theme: ThemeValidator });

export type SettingsUpdateInputValidatorType = z.infer<
  typeof SettingsUpdateInputValidator
>;

export default SettingsValidator;
