import { memo } from 'react';
import PropTypes from 'prop-types';
import LanguageSwitcher from '../../language-settings/language-switcher';
import './style.css';

function Head({ title }) {
  return (
    <div className="Head">
      <h1 className="Head-title">{title}</h1>
      <LanguageSwitcher />
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
