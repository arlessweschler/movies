import React from 'react';
import { v4 as uuidv4 } from 'uuid';


export default function UsersPage({ data = [] }) {
  console.log('UsersPage, render');

  return (
    <React.Fragment>
      <h2>UsersPage content</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Имя</th>
            <th>Фамилия</th>
          </tr>
        </thead>

        <tbody>
          {data.map(function (user, index) {
            return (
              <tr key={uuidv4()}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
}