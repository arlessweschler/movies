import React from 'react';


export default function UsersPage({ data = [] }) {
  console.log('UsersPage, render');

  return (
    <div>
      <h2>UsersPage content</h2>
      {data.map(function (user, index) {
        return (
          <div key={user.id}>
            {index + 1}. {user.name} {user.surname}
          </div>
        );
      })}
    </div>
  );
}