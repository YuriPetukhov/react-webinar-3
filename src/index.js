import { useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StoreContext } from './store/context';
import { I18nProvider } from './i18n/context';
import App from './app';
import Store from './store';
import React, { useEffect } from 'react';

const store = new Store();

const AuthInitializer = ({ children }) => {
  useEffect(() => {
    store.actions.auth.checkAuth();
  }, []);

  return children;
};

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <I18nProvider>
      <AuthInitializer>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthInitializer>
    </I18nProvider>
  </StoreContext.Provider>,
);
