import { memo } from 'react';
import './style.css';

function ProfileDetails({ profileData }) {
  console.log("Parameter ", profileData)
  return (
    <div className="ProfileDetails">
      <h2>Профиль</h2>
      <p><strong>Имя:</strong> {profileData.profile.name || 'Не указано'}</p>
      <p><strong>Телефон:</strong> {profileData.profile.phone || 'Не указано'}</p>
      <p><strong>Email:</strong> {profileData.email || 'Не указано'}</p>
    </div>
  );
}



export default memo(ProfileDetails);
