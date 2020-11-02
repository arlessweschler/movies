import React from 'react';
import PT from 'prop-types';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';

import { redirect } from 'app_history';
import { resetMovieDetails } from 'redux_actions';

function withMoviesNav(WrappedComponent) {
  const MoviesNav = (props) => {
    const dispatch = useDispatch();

    function update(nextValues) {
      const { location } = props;
      const nextUrlParams = {
        ...qs.parse(location.search),
        ...nextValues
      };

      redirect(`/?${qs.stringify(nextUrlParams)}`);
    }

    // обработчик пагинации (из списка фильмов или результатов поиска)
    function linkPage({ selected }) {
      update({ page: selected + 1 })
    }

    // обработчик для перехода на маршрут деталей фильма (из списка фильмов, результатов поиска или рекоммендаций)
    function linkMovie(id) {
      const { location } = props;
      const { lng } = qs.parse(location.search);

      dispatch(resetMovieDetails());
      redirect(`/movies/${id}?${qs.stringify({ lng })}`);
    };

    return (
      <WrappedComponent
        linkMovie={linkMovie}
        linkPage={linkPage}
        {...props}
      />
    );
  };

  MoviesNav.propTypes = {
    location: PT.shape({
      search: PT.string.isRequired
    }).isRequired
  };

  return withRouter(MoviesNav);
}

export default withMoviesNav;