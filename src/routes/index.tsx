
// Project Imports
import { useEffect } from 'react';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { checkAuthStatus } from '@/pages/authentication/redux/auth.slice';
import { useAppDispatch, useAppSelector } from '@/libs/hooks';

const Routes = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isRehydrated = useAppSelector((state) => state._persist?.rehydrated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isRehydrated) {
      dispatch(checkAuthStatus());
    }
  }, [isRehydrated, dispatch]);

  if (!isRehydrated) return null;

  return isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Routes;
