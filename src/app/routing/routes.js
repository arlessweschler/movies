import RootRoute from '@/routing/RootRoute';
import NotFoundPage from '@/components/pages';
import MoviesRouteContainer from '@/containers/MoviesRouteContainer';
import MovieRouteContainer from '@/containers/MovieRouteContainer';

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