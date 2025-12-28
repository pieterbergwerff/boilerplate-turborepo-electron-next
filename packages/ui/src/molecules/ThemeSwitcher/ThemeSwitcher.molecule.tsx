'use client';

// import hooks
import useTheme from '@packages/hooks/useTheme.hook';

// import components
import Switch from '../../atoms/Switch';

// import types
import type { FC } from 'react';

export const ThemeSwitcherMoleculeComponent: FC = () => {
  const { theme, setTheme, isChangingTheme } = useTheme();

  if (!theme) {
    return null;
  }

  return (
    <Switch
      label={theme}
      onChange={checked => setTheme(checked ? 'dark' : 'light')}
      checked={theme === 'dark'}
      disabled={isChangingTheme}
    />
  );
};

export default ThemeSwitcherMoleculeComponent;
