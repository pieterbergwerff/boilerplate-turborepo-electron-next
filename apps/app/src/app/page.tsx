// import components
import Box from '@packages/ui/atoms/Box';
import ThemeSwitcher from '@packages/ui/molecules/ThemeSwitcher';

// import types
import type { FC } from 'react';

/**
 * Home page for the application.
 * @returns {React.JSX.Element} Home page content
 */
const HomePage: FC = () => {
  return (
    <Box clsx="p-4">
      Hello world
      <ThemeSwitcher />
    </Box>
  );
};

export default HomePage;
