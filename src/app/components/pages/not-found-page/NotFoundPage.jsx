import React from 'react';
import { Route } from 'react-router-dom';

export default function NotFoundPage() {

  return (
    <Route render={function ({ staticContext }) {
      if (staticContext) {
        staticContext.status = 404;
      }
      return (
        <div>
          <h2>404 NotFoundPage</h2>
          <p>Страница не найдена</p>
        </div>
      );
    }} />
  );
}