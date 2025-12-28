// import utils
import detectColorSchemePreference from '@utils/client/detectColorSchemePreference.util';
import canUseElectronApi from '@utils/client/canUseElectronApi.util';

// import hooks
import { startTransition, useActionState } from 'react';
import useMutation from 'swr/mutation';
import useSettings from './useSettings.hook.js';
import useIsClient from './useIsClient.hook.js';

// import types
import type ThemeType from '@packages/types/theme/theme.types';

export const useThemeHook = (): {
  theme: ThemeType;
  setTheme: (newTheme: ThemeType) => Promise<void>;
  isChangingTheme: boolean;
  isLoading: boolean;
} => {
  const isClient = useIsClient();
  const settings = useSettings();

  const { trigger, isMutating } = useMutation(
    isClient && canUseElectronApi() ? 'set-app-theme' : null,
    async (key, { arg }: { arg: { theme: ThemeType } }) => {
      if (!key) return;
      if (arg.theme === 'system') {
        arg.theme = detectColorSchemePreference();
      }
      return window.api!.setTheme(arg.theme);
    }
  );

  const [, dispatch, isPending] = useActionState(
    async (_: ThemeType, newTheme: ThemeType) => {
      await trigger({ theme: newTheme });
      await settings.mutate();
      return newTheme;
    },
    detectColorSchemePreference()
  );

  const theme =
    !settings.isLoading && !settings.error && settings.data
      ? settings.data.theme
      : isClient
        ? detectColorSchemePreference()
        : detectColorSchemePreference();

  const setTheme = async (newTheme: ThemeType) =>
    startTransition(() => dispatch(newTheme));

  const isLoading = settings.isLoading || !settings.data;

  return {
    theme: theme ?? detectColorSchemePreference(),
    setTheme,
    isChangingTheme: isPending || isMutating,
    isLoading,
  };
};

export default useThemeHook;
