// import validators
import {
  OpenDialogOptionsValidator,
  OpenDialogResultValidator,
} from '@packages/validators';

// import types
import type { OpenDialogResultType } from '@packages/validators';

export const fsOpenDialogHandler = async (
  _evt,
  payload: unknown
): Promise<OpenDialogResultType> => {
  const opts = OpenDialogOptionsValidator.parse(payload);
  const res = await require('electron').dialog.showOpenDialog({
    properties: ['openFile'],
    ...(opts.filters && { filters: opts.filters }),
  });
  return OpenDialogResultValidator.parse({ filePaths: res.filePaths });
};

export default fsOpenDialogHandler;
