import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Layout from 'app_components/layout/layout/Layout';
import HomePage from 'app_components/pages/home-page/HomePage';
import DashboardPage from 'app_components/pages/dashboard-page/DashboardPage';
import UsersContainer from 'app_containers/UsersContainer';

console.log('-- AppBrowserRouter');

export default function AppBrowserRouter() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/dashboard">
            <DashboardPage />
          </Route>
          <Route path="/users">
            <UsersContainer />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}