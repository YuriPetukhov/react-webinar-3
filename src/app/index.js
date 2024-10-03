import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import LoginPage from './login';
import ProfilePage from './profile';
import { useAuth } from '../store/auth-cont';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const { isAuthenticated, token } = useAuth();
  const activeModal = useSelector(state => state.modals.name);

  // Компонент для защищенных маршрутов
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <>
      <Routes>
        <Route path="" element={<Main />} />
        <Route path="/articles/:id" element={<Article />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
