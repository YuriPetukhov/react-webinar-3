import useTranslate from '../../hooks/use-translate';
import './style.css';

function LoginForm({ login, setLogin, password, setPassword, error, handleLogin }) {
  const { t } = useTranslate();
  return (
    <div className="login-page">
      <h2>{t('login.login')}</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="login">{t('login.field')}</label>
        <input
          id="login"
          type="text"
          value={login}
          onChange={e => setLogin(e.target.value)}
          required
        />

        <label htmlFor="password">{t('login.password')}</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">{t('login.button')}</button>
      </form>
    </div>
  );
}

export default LoginForm;
