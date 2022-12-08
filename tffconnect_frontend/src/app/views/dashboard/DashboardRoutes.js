import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const MainView = Loadable(lazy(() => import('./MainView')));
const Favorites = Loadable(lazy(() => import('./Favorites')));
const RefereeGames = Loadable(lazy(() => import('../general_informations/RefereeGames')));

const dashboardRoutes = [
  { path: '/dashboard', element: <MainView />, auth: authRoles.guest },
  { path: '/favorites', element: <Favorites />, auth: authRoles.admin },
  { path: '/data/referee_games', element: <RefereeGames />, auth: authRoles.admin },
];

export default dashboardRoutes;
