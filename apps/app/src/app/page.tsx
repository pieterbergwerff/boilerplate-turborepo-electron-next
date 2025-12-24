// import components
import { List } from '@packages/ui/organisms/List';

// import types
import type { FC } from 'react';

/**
 * Home page for the application.
 * @returns {React.JSX.Element} Home page content
 */
const HomePage: FC = () => {
  return (
    <div className="h-full w-full">
      Hello world
      <List
        data={[
          <a key="home" href="/">
            home
          </a>,
          <a key="ui" href="/components">
            ui
          </a>,
          <a key="settings" href="/settings">
            settings
          </a>,
        ]}
      />
    </div>
  );
};

export default HomePage;
