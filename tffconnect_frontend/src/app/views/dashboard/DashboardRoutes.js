import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const MainView = Loadable(lazy(() => import('./MainView')));
const Favorites = Loadable(lazy(() => import('./Favorites')));
const RefereeGames = Loadable(lazy(() => import('../general_informations/RefereeGames')));
const RefereeVoting = Loadable(lazy(() => import('../general_informations/RefereeVoting')));
const ReportedComments = Loadable(lazy(() => import('../general_informations/ReportedComments')));
const MatchDetail = Loadable(lazy(() => import('app/views/MatchDetail')));

const dashboardRoutes = [
  { path: '/dashboard', element: <MainView />, auth: authRoles.guest },
  { path: '/favorites', element: <Favorites />, auth: authRoles.guest },
  { path: '/data/reported_comments', element: <ReportedComments />, auth: authRoles.admin },
  { path: '/data/referee_games', element: <RefereeGames />, auth: authRoles.guest },
  { path: '/data/referee_vote', element: <RefereeVoting />, auth: authRoles.guest },
  { path: '/match/:id', element: <MatchDetail /> },
];

export default dashboardRoutes;
