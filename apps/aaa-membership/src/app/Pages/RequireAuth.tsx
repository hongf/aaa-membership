import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthProvider';
import { EnumUserRole } from '../theme/enum/EnumUserRole';

interface IProps {
  allowedRoles: EnumUserRole[];
}

const RequireAuth = ({ allowedRoles }: IProps) => {
  const { auth } = useAuthContext();
  const location = useLocation();

  return auth?.roles?.find((role: EnumUserRole) =>
    allowedRoles?.includes(role),
  ) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
