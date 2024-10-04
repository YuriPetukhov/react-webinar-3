import { memo, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../../store/context';
import UserLink from '../user-link';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function LoginButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const store = useContext(StoreContext);
  const { t } = useTranslate();

  const { isAuthenticated } = store.getState().auth;

  const handleLoginClick = () => {
    localStorage.setItem('previousPath', location.pathname);
    console.log("Page saved", location.pathname);
    navigate('/login');
  };

  const handleLogout = async () => {
    await store.actions.auth.logout();
    navigate('/login');
  };

  if (isAuthenticated) {
    return (
      <div className="LogOut">
        <UserLink />
        <button onClick={handleLogout} className="logout-button">
          {t('login.logout')}
        </button>
      </div>
    );
  } else {
    return (
      <div className="Login">
        <button onClick={handleLoginClick} className="login-button">
          {t('login.login')}
        </button>
      </div>
    );
  }
}

export default memo(LoginButton);