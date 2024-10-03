import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth-cont';
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
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslate();

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const token = await authLogin(login, password);
      localStorage.setItem('token', token);
      navigate('/profile');
    } catch (err) {
      console.error('Login error:', err);
      setError('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
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
