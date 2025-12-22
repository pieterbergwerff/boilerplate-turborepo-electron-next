// import utils
import { z } from 'zod';

// import validators
import OSThemeValidator from './os-theme.validator.js';

export const AppInfoValidator = z.object({
  version: z.string(),
  platform: z.string(),
  arch: z.string(),
  osTheme: OSThemeValidator,
});

export type AppInfoValidatorType = z.infer<typeof AppInfoValidator>;

export default AppInfoValidator;
