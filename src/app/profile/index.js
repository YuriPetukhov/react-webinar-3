import { useState } from 'react';
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


return (
<PageLayout>
<LoginButton/>
<Head title="Магазин">
<LocaleSelect />
</Head>
<Navigation />
{error && <div>{error}</div>}
{user && <ProfileDetails profileData={user} />}
</PageLayout>
);
}

export default ProfilePage;