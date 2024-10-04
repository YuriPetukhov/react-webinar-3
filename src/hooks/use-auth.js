import { useContext, useEffect, useState } from 'react';
import { StoreContext } from './store/context';

class UseAuth {
  constructor(store) {
    this.store = store;
  }

  useAuth() {
    const [authState, setAuthState] = useState(this.store.getState().auth);

    useEffect(() => {
      const unsubscribe = this.store.subscribe(() => {
        setAuthState(this.store.getState().auth);
      });
      return unsubscribe;
    }, []);

    const login = async (username, password) => {
      await this.store.actions.auth.login(username, password);
    };

    const logout = () => {
      this.store.actions.auth.logout();
    };

    return {
      user: authState.user,
      token: authState.token,
      isAuthenticated: authState.isAuthenticated,
      login,
      logout
    };
  }
}

export const useAuth = () => {
  const store = useContext(StoreContext);
  const authHook = new UseAuth(store);
  return authHook.useAuth();
};