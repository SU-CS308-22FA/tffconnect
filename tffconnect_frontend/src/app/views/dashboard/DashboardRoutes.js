import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const MainView = Loadable(lazy(() => import('./MainView')));
const Favorites = Loadable(lazy(() => import('./Favorites')));
const RefereeGames = Loadable(lazy(() => import('../general_informations/RefereeGames')));
const MatchDetail = Loadable(lazy(() => import('app/views/MatchDetail')));

const dashboardRoutes = [
  { path: '/dashboard', element: <MainView />, auth: authRoles.guest },
  { path: '/favorites', element: <Favorites />, auth: authRoles.admin },
  { path: '/data/referee_games', element: <RefereeGames />, auth: authRoles.admin },
  { path: '/match/:id', element: <MatchDetail /> },
];

export default dashboardRoutes;
