export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  { name: 'Icons', path: '/material/icons', iconText: 'I' },
  { label: 'PAGES', type: 'label' },
  {
    name: 'Session/Auth',
    icon: 'security',
    children: [
      { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
      { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
      { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
      { name: 'Error', iconText: '404', path: '/session/404' },
    ],
  },
  { label: 'Add Product', type: 'label' },
  {
    name: 'Components',
    icon: 'favorite',
    badge: { value: '30+', color: 'secondary' },
    children: [
      { name: 'Add Product', path: '/material/form', iconText: 'F' },
    ],
  },
  { label: 'Table', type: 'label' },
  {
    name: 'Components',
    icon: 'favorite',
    badge: { value: '30+', color: 'secondary' },
    children: [
      // { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
      // { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
      
     
      { name: 'All Order', path: '/material/table1', iconText: 'T' },
      { name: 'All Product', path: '/material/table2', iconText: 'T' },
      { name: 'All Customer', path: '/material/table3', iconText: 'T' },
    ],
  },
  { label: 'Order Page', type: 'label' },
  {
    name: 'Components',
    icon: 'favorite',
    badge: { value: '30+', color: 'secondary' },
    children: [
      { name: 'Add to cart', path: '/material/form1', iconText: 'B' },
      { name: 'Check Out', path: '/material/form2', iconText: 'B' },
    ],
  },
];
