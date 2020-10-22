import React from 'react';

import { NavigationFixed } from 'app_components/layout';

const Header = () => {
  return (
    <header className="fixed-top">
      <NavigationFixed />
    </header>
  );
}

export default Header;