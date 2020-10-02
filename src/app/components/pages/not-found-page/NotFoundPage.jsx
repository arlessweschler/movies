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
          <p>404 - Страница не найдена</p>
        </div>
      );
    }} />
  );
}