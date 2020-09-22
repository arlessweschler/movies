import asyncComponent from 'app_root/async-routing/AsyncComponent';

// import { Layout } from 'app_components/layout';

// требуется заранее зарекваерить основные компоненты для корректной отрисовки разметки данных на сервере при серверном рендеринге
import UsersContainer from 'app_containers/UsersContainer';

let routes = [
  {
    path: '/',
    exact: true,
    component: asyncComponent(
      () => import('app_components/pages/home-page/HomePage').then(module => module.default)
    )
  },
  
  {
    path: '/dashboard',
    component: asyncComponent(
      () => import('app_components/pages/dashboard-page/DashboardPage').then(module => module.default)
    )
  },

  {
    path: '/users',
    component: UsersContainer
  }
];

/* const routes = [
  {
    component: Layout,
    routes: list
  }
]; */

export default routes;