import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}