import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const AppTable = Loadable(lazy(() => import('./tables/AppTable')));
const AppForm = Loadable(lazy(() => import('./forms/AppForm')));
const AppButton = Loadable(lazy(() => import('./buttons/AppButton')));
const AppIcon = Loadable(lazy(() => import('./icons/AppIcon')));
const AppProgress = Loadable(lazy(() => import('./AppProgress')));
const AppMenu = Loadable(lazy(() => import('./menu/AppMenu')));
const AppCheckbox = Loadable(lazy(() => import('./checkbox/AppCheckbox')));
const AppSwitch = Loadable(lazy(() => import('./switch/AppSwitch')));
const AppRadio = Loadable(lazy(() => import('./radio/AppRadio')));
const AppSlider = Loadable(lazy(() => import('./slider/AppSlider')));
const AppDialog = Loadable(lazy(() => import('./dialog/AppDialog')));
const AppSnackbar = Loadable(lazy(() => import('./snackbar/AppSnackbar')));
const AppAutoComplete = Loadable(lazy(() => import('./auto-complete/AppAutoComplete')));
const AppExpansionPanel = Loadable(lazy(() => import('./expansion-panel/AppExpansionPanel')));
const AddProject = Loadable(lazy(() => import('../AddProject')));
const ListProject = Loadable(lazy(() => import('../ListProject')));
const UpdateProject = Loadable(lazy(() => import('../UpdateProject')));
const ProjectsDashboard = Loadable(lazy(() => import('../ProjectsDashboard')));
const AddReferees = Loadable(lazy(() => import('../AddReferees')));
const ListReferees = Loadable(lazy(() => import('../ListReferees')));
const TheProject = Loadable(lazy(() => import('../TheProject')));
const UserProfile = Loadable(lazy(() => import('../UserProfile')));


const materialRoutes = [
  {
    path: '/material/table',
    element: <AppTable />,
  },
  {
    path: '/material/form',
    element: <AppForm />,
  },
  {
    path: '/material/buttons',
    element: <AppButton />,
  },
  {
    path: '/material/icons',
    element: <AppIcon />,
  },
  {
    path: '/material/progress',
    element: <AppProgress />,
  },
  {
    path: '/material/menu',
    element: <AppMenu />,
  },
  {
    path: '/material/checkbox',
    element: <AppCheckbox />,
  },
  {
    path: '/material/switch',
    element: <AppSwitch />,
  },
  {
    path: '/material/radio',
    element: <AppRadio />,
  },
  {
    path: '/material/slider',
    element: <AppSlider />,
  },
  {
    path: '/material/autocomplete',
    element: <AppAutoComplete />,
  },
  {
    path: '/material/expansion-panel',
    element: <AppExpansionPanel />,
  },
  {
    path: '/material/dialog',
    element: <AppDialog />,
  },
  {
    path: '/material/snackbar',
    element: <AppSnackbar />,
  },
  {
    path: '/material/addproject',
    element: <AddProject />,
  },
  {
    path: '/material/listproject',
    element: <ListProject />,
  },
  {
    path: '/material/updateproject',
    element: <UpdateProject />,
  },
  {
    path: '/material/ProjectsDashboard',
    element: <ProjectsDashboard />,
  },
  {
    path: '/material/AddReferees',
    element: <AddReferees />,
  },
  {
    path: '/material/ListReferees',
    element: <ListReferees />,
  },
  {
    path: '/project/:id',
    element: <TheProject />,
  },
  {
    path: '/material/UserProfile',
    element: <UserProfile />,
  },
];

export default materialRoutes;
