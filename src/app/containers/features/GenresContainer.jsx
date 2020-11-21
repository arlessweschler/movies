import React, { Component } from 'react';
import PT from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { isEmpty, capitalize } from '@/utils/common';
import { getQueryParams, hasRequestDiffs } from '@/utils/url';
import { ProgressBar } from '@/layout';
import { getGenres } from '@/actions';

const mapStateToProps = ({ genresList }) => ({
  genresList
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getGenres
  }, dispatch)
});

class GenresContainer extends Component {
  componentDidUpdate() {
    // console.warn('\n--GenresContainer.componentDidUpdate()');

    const { genresList, actions } = this.props;
    const { request } = genresList;
    const checklist = ['lng'];

    if (hasRequestDiffs({ request, checklist })) {
      const { lng } = getQueryParams();
      actions.getGenres({ lng });
    }
  }

  componentDidMount() {
    // console.warn('\n--GenresContainer.componentDidMount()');

    const { genresList, actions } = this.props;
    const { lng } = getQueryParams();

    if (isEmpty(genresList.data)) {
      actions.getGenres({ lng });
    }
  }

  printGenres = ({ ids, cls }) => {
    const { genresList: { data } } = this.props;

    if (isEmpty(data)) return null;

    const text = ids
      .map((id) => {
        const item = data.find((i) => i.id === id);
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
      <>
        {genresList.isLoading && <ProgressBar />}

        {
          React.cloneElement(this.props.children, {
            printGenres: this.printGenres
          })
        }
      </>
    );
  }
}

GenresContainer.propTypes = {
  children: PT.oneOfType([
    PT.arrayOf(PT.node),
    PT.node
  ]).isRequired,

  location: PT.shape({
    search: PT.string.isRequired
  }).isRequired,

  actions: PT.shape({
    getGenres: PT.func.isRequired,
  }).isRequired,

  genresList: PT.shape({
    isLoading: PT.bool.isRequired,
    request: PT.shape({
      lng: PT.string
    }).isRequired,
    data: PT.array.isRequired
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GenresContainer));