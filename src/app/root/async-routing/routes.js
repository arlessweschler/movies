import asyncComponent from 'app_root/async-routing/AsyncComponent';

import Layout from 'app_components/layout/layout/Layout';
import HomePage from 'app_components/pages/home-page/HomePage';
// import DashboardPage from 'app_components/pages/dashboard-page/DashboardPage';

// требуется заранее зарекваерить основные компоненты для корректной отрисовки разметки данных на сервере при серверном рендеринге
import UsersContainer from 'app_containers/UsersContainer';

const list = [
  {
    path: '/',
    exact: true,
    component: HomePage
/*     component: asyncComponent(
      () => import('app_components/pages/home-page/HomePage').then(module => module.default)
    ) */
  },
  
  {
    path: '/dashboard',
    // component: DashboardPage
    component: asyncComponent(
      () => import('app_components/pages/dashboard-page/DashboardPage').then(module => module.default)
    )
  },

  {
    path: '/users',
    component: UsersContainer
  }
];

const routes = [
  {
    path: '/',
    component: Layout,
    routes: list
  }
];

export default routes;