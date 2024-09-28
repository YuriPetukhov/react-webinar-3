import { useTranslation } from '../../language-settings/use-translation';

import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const MainMenu = () => {

    const translate = useTranslation();

  return (
    <nav className="MainMenu">
      <ul>
        <li>
          <Link to="/">{translate('header.home')}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainMenu;
