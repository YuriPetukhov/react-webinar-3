import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../store/context';

function ProtectedRoute({ children }) {
  const store = useContext(StoreContext);
  const { isAuthenticated } = store.getState().auth;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;