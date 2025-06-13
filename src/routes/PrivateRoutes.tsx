import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// project import
import Layout from '@/components/layout';
import Loadable from '@/components/Loadable';

// Lazy-loaded components
const Home = Loadable(lazy(() => import('@/pages/Home')));
const About = Loadable(lazy(() => import('@/pages/About')));
const NotFoundPage = Loadable(lazy(() => import('./PageNotFound')));


const PrivateRoutes = () => (
  <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  </>
);

export default PrivateRoutes;
