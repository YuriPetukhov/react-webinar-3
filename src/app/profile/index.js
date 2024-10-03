import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth-cont';
import LoginButton from '../../components/login';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import ProfileDetails from '../../components/profile-details';

function ProfilePage() {
  const { user, token, logout } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  if (!user) {
    return (
      <PageLayout>
        <Head title="Загрузка...">
          <LocaleSelect />
        </Head>
        <Navigation />
        <div>Загрузка профиля...</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <LoginButton />
      <Head title="Магазин">
        <LocaleSelect />
      </Head>
      <Navigation />
      {error && <div className="error">{error}</div>}
      {user && (
        <>
          <ProfileDetails profileData={user} />
        </>
      )}
    </PageLayout>
  );
}

export default ProfilePage;