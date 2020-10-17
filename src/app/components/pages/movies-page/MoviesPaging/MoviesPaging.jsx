import 'app_components/pages/movies-page/MoviesPaging/MoviesPaging.scss';

import React from 'react';
import PT from 'prop-types';
import ReactPaginate from "react-paginate";

import PTS from 'app_services/PropTypesService';

function MoviesPaging(props) {
  return (
    <ReactPaginate
      previousLabel="&larr;"
      nextLabel="&rarr;"
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={props.pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={props.onPageChange}
      disableInitialCallback={true}
      initialPage={props.initialPage}
      forcePage={props.initialPage}
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
  );
};

MoviesPaging.propTypes = {
  initialPage: PT.number.isRequired,
  pageCount: PTS.nullOrNumber,
  onPageChange: PT.func.isRequired
};

export default MoviesPaging;