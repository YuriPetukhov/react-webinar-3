import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { StoreContext } from '../store/context';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import LoginPage from './login';
import ProfilePage from './profile';
import ProtectedRoute from '../components/protected-route';

function App() {
  const store = useContext(StoreContext);
  const activeModal = useSelector(state => state.modals.name);

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
