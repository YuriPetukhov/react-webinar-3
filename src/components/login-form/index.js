import './style.css';

function LoginForm({ login, setLogin, password, setPassword, error, handleLogin }) {
  return (
    <div className="login-page">
      <h2>Вход</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="login">Логин</label>
        <input
          id="login"
          type="text"
          value={login}
          onChange={e => setLogin(e.target.value)}
          required
        />

        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default LoginForm;
