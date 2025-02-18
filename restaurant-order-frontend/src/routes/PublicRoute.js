import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function PublicRoute({ children }) {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/menu" />;
  }

  return children;
}

export default PublicRoute;
