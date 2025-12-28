// import utils
import { detectOsFromUserAgent } from '@utils/client';

// import hooks
import useAppInfo from './useAppInfo.hook.js';
import useIsClient from './useIsClient.hook.js';

// import types
import type { OsThemeValidatorType } from '@packages/validators';

export const usePlatformHook = (): OsThemeValidatorType => {
  const isClient = useIsClient();
  const appInfo = useAppInfo();

  const platform =
    !appInfo.isLoading && !appInfo.error && appInfo.data
      ? appInfo.data.platform
      : isClient && detectOsFromUserAgent();

  if (
    typeof platform === 'string' &&
    ['windows', 'osx', 'linux'].includes(platform)
  ) {
    return platform as OsThemeValidatorType;
  }

  return 'windows';
};

export default usePlatformHook;
