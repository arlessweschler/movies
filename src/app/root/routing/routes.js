import { RootRoute } from 'app_root/routing/RootRoute';

import {
  HomePage,
  DashboardPage
} from 'app_components/pages';

import {
  UsersContainer
} from 'app_containers';

const routes = [
  {
    path: '/',
    component: RootRoute,
    routes: [
      {
        path: '/',
        exact: true,
        component: HomePage
      },

      {
        path: '/dashboard',
        component: DashboardPage
      },

      {
        path: '/users',
        component: UsersContainer
      }
    ]
  }
];

export default routes;