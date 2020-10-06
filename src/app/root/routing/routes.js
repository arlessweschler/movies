import { RootRoute } from 'app_root/routing/RootRoute';

import {
  HomePage,
  NotFoundPage
} from 'app_components/pages';

import {
  UsersListContainer,
  UserCardContainer,
  MoviesListContainer
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
        path: '/movies',
        exact: true,
        component: MoviesListContainer
      },

      {
        path: '/users',
        exact: true,
        component: UsersListContainer
      },

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