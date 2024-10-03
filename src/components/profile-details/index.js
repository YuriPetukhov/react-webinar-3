import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function ProfileDetails({ profileData }) {
  const { t } = useTranslate();
  return (
    <div className="ProfileDetails">
      <h2>{t('profile.title')}</h2>
      <p>
        <strong>{t('profile.name')}:</strong>{' '}
        {profileData.profile.name || t('profile.not-provided')}
      </p>
      <p>
        <strong>{t('profile.phone')}:</strong>{' '}
        {profileData.profile.phone || t('profile.not-provided')}
      </p>
      <p>
        <strong>Email:</strong> {profileData.email || t('profile.not-provided')}
      </p>
    </div>
  );
}

export default memo(ProfileDetails);
