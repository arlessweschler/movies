import RootRoute from 'app_routing/RootRoute';
import NotFoundPage from 'app_components/pages';

import {
  MoviesRouteContainer,
  MovieRouteContainer
} from 'app_containers';

const routes = [
  {
    path: '/',
    component: RootRoute,
    routes: [
      {
        path: '/',
        exact: true,
        component: MoviesRouteContainer
      },

      {
        path: '/movies/:movie_id',
        exact: true,
        component: MovieRouteContainer
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