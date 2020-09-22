import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { HomePage, DashboardPage } from 'app_components/pages';
import { Layout } from 'app_components/layout';
import { UsersContainer } from 'app_containers';

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