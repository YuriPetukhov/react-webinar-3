import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import LoginPage from './login'; // Импорт страницы авторизации
import ProfilePage from './profile'; // Импорт страницы профиля
import { useAuth } from '../store/auth-cont'; // Импортируйте хук для использования контекста авторизации

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const { isAuthenticated } = useAuth(); // Используйте хук useAuth для доступа к свойству isAuthenticated
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path={'/profile'}
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} // Защита маршрута профиля
        />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
