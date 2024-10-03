import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth-cont';
import UserLink from '../user-link';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function LoginButton() {
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();
  const { t } = useTranslate();

  if (isAuthenticated) {
    return (
      <div className="LogOut">
        <UserLink />
        <button onClick={async () => {
          await logout();
          navigate('/login');
        }} className="logout-button">
          {t('login.logout')}
        </button>
      </div>
    );
  } else {
    return (
      <div className="Login">
        <button onClick={() => navigate('/login')} className="login-button">
        {t('login.login')}
        </button>
      </div>
    );
  }
}

export default memo(LoginButton);
