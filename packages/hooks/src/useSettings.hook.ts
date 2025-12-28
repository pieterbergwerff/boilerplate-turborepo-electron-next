// import utils
import useSWR from 'swr';
import canUseElectronApi from '@utils/client/canUseElectronApi.util';

// import hooks
import useIsClient from './useIsClient.hook.js';

// import types
import type { SettingsValidatorType } from '@packages/validators/settings.validator';
import type { SWRResponse } from 'swr';

export const useSettingsHook = (): SWRResponse<
  SettingsValidatorType,
  Error
> => {
  const isClient = useIsClient();

  return useSWR(
    isClient && canUseElectronApi() ? 'app-settings' : null,
    () => window.api!.getSettings(),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );
};

export default useSettingsHook;
