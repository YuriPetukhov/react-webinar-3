import { memo } from 'react';
import './style.css';

function Profile({ handleLogout }) {
  return (
    <div className="Profile">
      <button onClick={handleLogout} className="logout-button">
        Выйти
      </button>
    </div>
  );
}

export default memo(Profile);
