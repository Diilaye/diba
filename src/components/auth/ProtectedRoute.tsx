import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    // Rediriger vers la page de connexion en conservant l'URL demandée
    return <Navigate to="/connexion" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
