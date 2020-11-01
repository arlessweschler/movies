import RootRoute from 'app_root/routing/RootRoute';

import {
  NotFoundPage
} from 'app_components/pages';

import {
  MListRouteContainer,
  MDetailsRouteContainer
} from 'app_containers';

const routes = [
  {
    path: '/',
    component: RootRoute,
    routes: [
      {
        path: '/',
        exact: true,
        component: MListRouteContainer
      },

      {
        path: '/movies',
        exact: true,
        component: MListRouteContainer
      },

      {
        path: '/movies/:movie_id',
        exact: true,
        component: MDetailsRouteContainer
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