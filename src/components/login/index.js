import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth-cont';
import UserLink from '../user-link';
import './style.css';

function LoginButton() {
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="LogOut">
        <UserLink />
        <button onClick={async () => {
          await logout();
          navigate('/login');
        }} className="logout-button">
          Выйти
        </button>
      </div>
    );
  } else {
    return (
      <div className="Login">
        <button onClick={() => navigate('/login')} className="login-button">
          Вход
        </button>
      </div>
    );
  }
}

export default memo(LoginButton);
