import RootRoute from 'app_root/routing/RootRoute';

import {
  NotFoundPage
} from 'app_components/pages';

import {
  MListContainer,
  MDetailsContainer
} from 'app_containers';

const routes = [
  {
    path: '/',
    component: RootRoute,
    routes: [
      {
        path: '/',
        exact: true,
        component: MListContainer
      },

      {
        path: '/movies',
        exact: true,
        component: MListContainer
      },

      {
        path: '/movies/:movie_id',
        exact: true,
        component: MDetailsContainer
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