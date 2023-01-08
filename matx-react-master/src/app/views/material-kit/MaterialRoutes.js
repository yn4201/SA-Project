import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const AppOrderTable = Loadable(lazy(() => import('./tables/AppOrderTable')));
const AppProductTable = Loadable(lazy(() => import('./tables/AppProductTable')));
const AppCustomer = Loadable(lazy(() => import('./tables/AppCustomer')));

const AppFormAdd = Loadable(lazy(() => import('./forms/AppFormAdd')));
const AppButton = Loadable(lazy(() => import('./buttons/AppButton')));
const AppIcon = Loadable(lazy(() => import('./icons/AppIcon')));
const AppCheckOut = Loadable(lazy(() => import('./forms/AppCheckOut')));
const AppAddCart = Loadable(lazy(() => import('./forms/AppAddCart')));
// const AppProgress = Loadable(lazy(() => import('./AppProgress')));
// const AppMenu = Loadable(lazy(() => import('./menu/AppMenu')));
// const AppCheckbox = Loadable(lazy(() => import('./checkbox/AppCheckbox')));
// const AppSwitch = Loadable(lazy(() => import('./switch/AppSwitch')));
// const AppRadio = Loadable(lazy(() => import('./radio/AppRadio')));
// const AppSlider = Loadable(lazy(() => import('./slider/AppSlider')));
const AppDialog = Loadable(lazy(() => import('./dialog/AppDialog')));
// const AppSnackbar = Loadable(lazy(() => import('./snackbar/AppSnackbar')));
// const AppAutoComplete = Loadable(lazy(() => import('./auto-complete/AppAutoComplete')));
// const AppExpansionPanel = Loadable(lazy(() => import('./expansion-panel/AppExpansionPanel')));

const materialRoutes = [
  {
    path: '/material/table3',
    element: <AppCustomer />,
  },
  {
    path: '/material/table1',
    element: <AppOrderTable />,
  },
  {
    path: '/material/table2',
    element: <AppProductTable />,
  },
  {
    path: '/material/form',
    element: <AppFormAdd />,
  },
  //
  {
    path: '/material/form2',
    element: <AppCheckOut />,
  },
  {
    path: '/material/form1',
    element: <AppAddCart />,
  },
  //
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
    // element: <AppProgress />,
  },
  {
    path: '/material/menu',
    // element: <AppMenu />,
  },
  {
    path: '/material/checkbox',
    // element: <AppCheckbox />,
  },
  {
    path: '/material/switch',
    // element: <AppSwitch />,
  },
  {
    path: '/material/radio',
    // element: <AppRadio />,
  },
  {
    path: '/material/slider',
    // element: <AppSlider />,
  },
  {
    path: '/material/autocomplete',
    // element: <AppAutoComplete />,
  },
  {
    path: '/material/expansion-panel',
    // element: <AppExpansionPanel />,
  },
  {
    path: '/material/dialog',
    element: <AppDialog />,
  },
  {
    path: '/material/snackbar',
    // element: <AppSnackbar />,
  },
];

export default materialRoutes;
