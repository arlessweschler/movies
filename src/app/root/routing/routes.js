import { RootRoute } from 'app_root/routing/RootRoute';

import {
  HomePage,
  NotFoundPage
} from 'app_components/pages';

import {
  UsersListContainer,
  UserCardContainer
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
        path: '/users',
        exact: true,
        component: UsersListContainer
      },

      // Карточка организации
      {
        path: '/users/:user_id',
        exact: true,
        component: UserCardContainer
      },

      {
        path: '*',
        component: NotFoundPage,
        status: 404
      }
    ]
  }
];

export default routes;