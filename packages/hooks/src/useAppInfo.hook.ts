// import utils
import useSWR from 'swr';
import canUseElectronApi from '@utils/client/canUseElectronApi.util';

// import hooks
import useIsClient from './useIsClient.hook.js';

// import types
import type { SWRResponse } from 'swr';
import type { AppInfoValidatorType } from '@packages/validators/app-info.validator';

export const useAppInfoHook = (): SWRResponse<AppInfoValidatorType, Error> => {
  const isClient = useIsClient();

  return useSWR(
    isClient && canUseElectronApi() ? 'app-info' : null,
    () => window.api!.getAppInfo(),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );
};

export default useAppInfoHook;
