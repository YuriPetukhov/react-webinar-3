import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../../store/context';
import { useNavigate } from 'react-router-dom';
import LoginButton from '../../components/login';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import ProfileDetails from '../../components/profile-details';
import useTranslate from '../../hooks/use-translate';
import Spinner from '../../components/spinner';

function ProfilePage() {
  const store = useContext(StoreContext);
  const [authState, setAuthState] = useState(store.getState().auth);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslate();

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setAuthState(store.getState().auth);
    });
    return unsubscribe;
  }, [store]);

  useEffect(() => {
    if (!authState.isAuthenticated && !authState.token) {
      navigate('/login');
    } else if (!authState.user) {
      store.actions.auth.checkAuth();
    }
  }, [authState, navigate, store.actions.auth]);

  if (!authState.isAuthenticated && !authState.token) {
    return null;
  }

  return (
    <PageLayout>
      <LoginButton />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      {error && <div className="error">{error}</div>}
      <Spinner active={authState.loading}>
        {authState.user ? (
          <ProfileDetails profileData={authState.user} />
        ) : (
          <div>Пожалуйста, войдите в систему</div>
        )}
      </Spinner>
    </PageLayout>
  );
}

export default ProfilePage;
