import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function Profile({ handleLogout }) {
  const { t } = useTranslate();
  return (
    <div className="Profile">
      <button onClick={handleLogout} className="logout-button">
        {t('login.logout')}
      </button>
    </div>
  );
}

export default memo(Profile);
