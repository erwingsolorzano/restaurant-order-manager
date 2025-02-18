import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function PrivateRoute({ children }) {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
