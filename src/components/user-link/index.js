import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../store/context';

const UserLink = () => {
  const store = useContext(StoreContext);
  const [authState, setAuthState] = useState(store.getState().auth);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setAuthState(store.getState().auth);
    });
    return unsubscribe;
  }, [store]);

  if (!authState.isAuthenticated || !authState.user) {
    return null;
  }

  return (
    <nav className="UserLink">
      <Link to="/profile">{authState.user.profile?.name || authState.user.email}</Link>
    </nav>
  );
};

export default UserLink;
