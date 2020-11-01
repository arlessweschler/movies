import React, { Component, Fragment } from 'react';
import PT from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import qs from 'query-string';

import { DEFAULT_LANGUAGE } from 'app_i18n';
import { isEmpty, capitalize } from 'app_services/UtilsService';
import { ProgressBar } from 'app_components/layout';
import { getGenres } from 'redux_actions';

// маппинг редюсеров
const mapStateToProps = ({ genresList }) => {
  return {
    genresList
  };
};

// маппинг экшен креэйторов
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getGenres
    }, dispatch)
  };
};

function withGenres(WrappedComponent) {
  class GenresContainer extends Component {

    componentDidUpdate() {
      const { genresList, location, actions } = this.props;
      const {
        lng = DEFAULT_LANGUAGE.value
      } = qs.parse(location.search);

      if (lng !== genresList.request.lng) {
        actions.getGenres({ lng });
      };
    }

    componentDidMount() {
      const { genresList, location, actions } = this.props;
      const { lng } = qs.parse(location.search);

      if (isEmpty(genresList.data)) {
        actions.getGenres({ lng });
      };
    }

    printGenres = ({ ids, cls }) => {
      const { genresList: { data } } = this.props;

      if (isEmpty(data)) return null;

      const text = ids
        .map(id => {
          let item = data.find(i => i.id === id);
          return item
            ? capitalize(item.name)
            : null;
        })
        .join(', ');

      return (
        <div className={cls}>
          {text}
        </div>
      );
    };

    render() {
      const { genresList } = this.props;

      return (
        <Fragment>
          {genresList.isLoading && <ProgressBar />}

          <WrappedComponent
            {...this.props}
            printGenres={this.printGenres}
          />
        </Fragment>
      );
    }
  };

  GenresContainer.propTypes = {
    location: PT.shape({
      search: PT.string.isRequired
    }).isRequired,

    actions: PT.shape({
      getGenres: PT.func.isRequired,
    }).isRequired,

    genresList: PT.shape({
      isLoading: PT.bool.isRequired,
      data: PT.array.isRequired
    }).isRequired
  };

  return connect(mapStateToProps, mapDispatchToProps)(withRouter(GenresContainer));
}

export default withGenres;