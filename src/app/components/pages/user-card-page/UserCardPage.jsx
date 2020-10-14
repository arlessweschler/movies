import React, { Fragment } from 'react';

export default function UserCardPage({ data, message }) {
  const { details = {} } = data;
  return (
    <Fragment>
      <h2>Карточка пользователя</h2>
      {message
        ? <p>{message}</p>
        : (
          <table className="table mt-4">
            <tbody>
              <tr>
                <td>ID</td>
                <td>{data.id}</td>
              </tr>
              <tr>
                <td>Имя</td>
                <td>{data.name}</td>
              </tr>
              <tr>
                <td>Фамилия</td>
                <td>{data.surname}</td>
              </tr>
              <tr>
                <td>Город</td>
                <td>{details.city}</td>
              </tr>
              <tr>
                <td>Возраст</td>
                <td>{details.age}</td>
              </tr>
              <tr>
                <td>IP</td>
                <td>{details.ip}</td>
              </tr>
              <tr>
                <td>Дата регистрации</td>
                <td>{details.registration_date}</td>
              </tr>
              <tr>
                <td>Дата последнего посещения</td>
                <td>{details.last_visit_date}</td>
              </tr>
            </tbody>
          </table>
        )
      }
    </Fragment>
  );
}