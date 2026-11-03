import { RouteObject } from 'react-router-dom';
import HomePage from '../pages/home/page';
import AcercaDePage from '../pages/acerca-de/page';
import CausasPage from '../pages/causas/page';
import JuntosPage from '../pages/juntos/page';
import OpinionPage from '../pages/opinion/page';
import GaleriaPage from '../pages/galeria/page';
import ComunicadosPage from '../pages/comunicados/page';
import NoticiasPage from '../pages/noticias/page';
import NoticiaDetailPage from '../pages/noticias/noticia-detail/page';
import AdminPage from '../pages/admin/page';
import NotFoundPage from '../pages/NotFound';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/acerca-de',
    element: <AcercaDePage />,
  },
  {
    path: '/causas',
    element: <CausasPage />,
  },
  {
    path: '/juntos',
    element: <JuntosPage />,
  },
  {
    path: '/opinion',
    element: <OpinionPage />,
  },
  {
    path: '/galeria',
    element: <GaleriaPage />,
  },
  {
    path: '/comunicados',
    element: <ComunicadosPage />,
  },
  {
    path: '/noticias',
    element: <NoticiasPage />,
  },
  {
    path: '/noticias/:id',
    element: <NoticiaDetailPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;