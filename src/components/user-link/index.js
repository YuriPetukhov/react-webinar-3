import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { useAuth } from '../../store/auth-cont';

const UserLink = () => {
  const { user } = useAuth();

  return (
    <nav className="UserLink">
          {user && (
            <Link to={`/profile`}>{user.profile.name}</Link>
          )}
    </nav>
  );
};

export default UserLink;
