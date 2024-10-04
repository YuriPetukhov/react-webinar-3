import { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../../store/context';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '../../components/login-form';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import LoginButton from '../../components/login';
import useTranslate from '../../hooks/use-translate';

function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const store = useContext(StoreContext);
  const authLogin = store.actions.auth.login.bind(store.actions.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslate();

  useEffect(() => {
    const from = localStorage.getItem('previousPath') || '/';
    localStorage.setItem('previousPath', from);
    console.log('page ', from);
  }, [location]);

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const token = await authLogin(login, password);
      localStorage.setItem('token', token);
      const previousPath = localStorage.getItem('previousPath') || '/';
      navigate(previousPath);
      localStorage.removeItem('previousPath');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    }
  };

  return (
    <PageLayout>
      <LoginButton />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm
        login={login}
        setLogin={setLogin}
        password={password}
        setPassword={setPassword}
        error={error}
        handleLogin={handleLogin}
      />
    </PageLayout>
  );
}

export default LoginPage;
