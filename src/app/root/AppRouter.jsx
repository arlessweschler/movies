import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {
  HomePage,
  DashboardPage
} from 'app_components/pages';

import UsersContainer from 'app_containers/UsersContainer';


export default function BrowserRouterExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">DashboardPage</Link>
          </li>
          <li>
            <Link to="/users">UsersContainer</Link>
          </li>
        </ul>

        <hr />

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
      </div>
    </Router>
  );
}