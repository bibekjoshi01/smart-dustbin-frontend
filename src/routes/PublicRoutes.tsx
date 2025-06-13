import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Loadable from '@/components/Loadable';

// Lazy-loaded components
const AuthLogin = Loadable(lazy(() => import('@/pages/authentication/login')));
const NotFoundPage = Loadable(lazy(() => import('./PageNotFound')));

const MinimalLayout = () => (
  <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
    <Outlet />
  </Box>
);

const PublicRoutes = () => (
  <>
    <Routes>
      <Route path="/" element={<MinimalLayout />}>
        <Route path="" element={<AuthLogin />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
);

export default PublicRoutes;
