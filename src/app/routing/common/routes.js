import RootRoute from '@/routing/common/RootRoute';
import MoviesRouteContainer from '@/containers/MoviesRouteContainer';
import MovieRouteContainer from '@/containers/MovieRouteContainer';
import NotFoundPage from '@/pages';

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
        path: '/movies/:movieId',
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