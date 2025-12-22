// import utils
import { z } from 'zod';

export const OpenDialogOptionsValidator = z.object({
  filters: z
    .array(
      z.object({
        name: z.string(),
        extensions: z.array(z.string()),
      })
    )
    .optional(),
});

export type OpenDialogOptionsType = z.infer<typeof OpenDialogOptionsValidator>;

export const OpenDialogResultValidator = z.object({
  filePaths: z.array(z.string()),
});

export type OpenDialogResultType = z.infer<typeof OpenDialogResultValidator>;

export default {
  OpenDialogOptionsValidator,
  OpenDialogResultValidator,
};
