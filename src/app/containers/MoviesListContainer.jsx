import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import qs from 'query-string';


import { redirect, isEmpty } from 'app_services/Utils.service';
import { MoviesToolbar, MoviesPaging, MoviesList } from 'app_components/pages';
import { 
  getMovies,
  getGenres 
} from 'redux_actions';

// маппинг редюсеров
const mapStateToProps = ({ moviesGenres, moviesList }) => {
  return {
    moviesGenres,
    moviesList
  };
};

// маппинг экшен креэйторов
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getMovies,
      getGenres
    }, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class MoviesListContainer extends Component {

  constructor() {
    super();
    this.getUrlParams = this.getUrlParams.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  static fetchData(store, urlParams, urlQuery) {
    store.dispatch(getGenres());
    store.dispatch(getMovies(urlQuery));
  }

  componentDidMount() {
    const { moviesType, page } = this.getUrlParams();
    const { moviesList, moviesGenres, actions } = this.props;

    if (isEmpty(moviesGenres.data)) {
      actions.getGenres();
    };

    // запрашиваем фильмы, если их нет или если есть фильтр из url и список имеющихся фильмов отличается от их типа фильтрации
    if (isEmpty(moviesList.data.results)) {
      actions.getMovies({ moviesType, page });
    };
  }

  getUrlParams() {
    return qs.parse(this.props.history.location.search);
  }

  handleFilter(moviesType) {
    redirect(`/movies?moviesType=${moviesType}`);
    this.props.actions.getMovies({ moviesType });
  }

  onPageChange({ selected }) {
    const { moviesType } = this.getUrlParams();
    const urlParams = { moviesType, page: selected + 1 };

    redirect(`/movies?${qs.stringify(urlParams)}`);
    this.props.actions.getMovies(urlParams);
  }

  render() {
    const { moviesList, moviesGenres } = this.props;
    const { data, isLoading, error } = moviesList;

    const { moviesType } = this.getUrlParams();

    return (
      <React.Fragment>
        <MoviesToolbar
          activeFilter={moviesType}
          handleFilter={this.handleFilter}
        />
        <MoviesPaging
          pageCount={data.total_pages}
          initialPage={data.page - 1}
          onPageChange={this.onPageChange}
        />
        <MoviesList
          genres={moviesGenres.data}
          movies={data.results}
          isLoading={isLoading}
          error={error}
        />
      </React.Fragment>
    );
  }
};