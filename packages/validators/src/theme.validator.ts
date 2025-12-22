// import utils
import { z } from 'zod';

export const ThemeValidator = z.enum(['light', 'dark']);

export type ThemeValidatorType = z.infer<typeof ThemeValidator>;

export default ThemeValidator;
