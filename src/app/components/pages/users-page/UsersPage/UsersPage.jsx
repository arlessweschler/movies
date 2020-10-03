import React from 'react';
import { v4 as uuidv4 } from 'uuid';


export default function UsersPage({ list = null, message = '', handleRowClick }) {
  return (
    <React.Fragment>
      {message && <p>{message}</p>}

      {list && <table className="table table-hover users-table">
        <thead>
          <tr>
            <th>#</th>
            <th>id</th>
            <th>Имя</th>
            <th>Фамилия</th>
          </tr>
        </thead>

        <tbody>
          {list.map(function (user, index) {
            return (
              <tr key={uuidv4()} onClick={() => handleRowClick(user.id)}>
                <td>{index + 1}</td>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
              </tr>
            );
          })}
        </tbody>
      </table>}
    </React.Fragment>
  );
}