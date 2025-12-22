// import types
import type { FC } from 'react';

/**
 * Home page for the application.
 * @returns {React.JSX.Element} Home page content
 */
const HomePage: FC = () => {
  return (
    <div className="h-full w-full">
      Hello world <a href="/settings">settings</a>
    </div>
  );
};

export default HomePage;
