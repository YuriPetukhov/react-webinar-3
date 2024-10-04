import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function ProfileDetails({ profileData }) {
  const { t } = useTranslate();
  return (
    <div className="ProfileDetails">
      <h2>{t('profile.title')}</h2>
      <p>
        {t('profile.name')}:<strong>{profileData.profile.name || t('profile.not-provided')}</strong>
      </p>
      <p>
        {t('profile.phone')}:
        <strong>{profileData.profile.phone || t('profile.not-provided')}</strong>
      </p>
      <p>
        email: <strong>{profileData.email || t('profile.not-provided')}</strong>
      </p>
    </div>
  );
}

export default memo(ProfileDetails);
