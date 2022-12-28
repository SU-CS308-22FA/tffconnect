import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const MainView = Loadable(lazy(() => import('./MainView')));
const Favorites = Loadable(lazy(() => import('./Favorites')));
const RefereeGames = Loadable(lazy(() => import('../general_informations/RefereeGames')));
const RefereeVoting = Loadable(lazy(() => import('../general_informations/RefereeVoting')));

const dashboardRoutes = [
  { path: '/dashboard', element: <MainView />, auth: authRoles.guest },
  { path: '/favorites', element: <Favorites />, auth: authRoles.guest },
  { path: '/data/referee_games', element: <RefereeGames />, auth: authRoles.guest },
  { path: '/data/referee_vote', element: <RefereeVoting />, auth: authRoles.guest },
];

export default dashboardRoutes;
