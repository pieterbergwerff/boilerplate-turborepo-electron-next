// import utils
import { z } from 'zod';

export const OSThemeValidator = z.enum(['windows', 'osx', 'linux']);

export type OsThemeValidatorType = z.infer<typeof OSThemeValidator>;

export default OSThemeValidator;
