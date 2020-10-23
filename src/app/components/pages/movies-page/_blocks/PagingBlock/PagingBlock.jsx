import './PagingBlock.scss';

import React from 'react';
import PT from 'prop-types';
import ReactPaginate from "react-paginate";

import PTS from 'app_services/PropTypesService';

function PagingBlock(props) {
  return (
    <ReactPaginate
      previousLabel="&larr;"
      nextLabel="&rarr;"
      breakLabel="..."
      breakClassName="break-me"
      pageCount={props.pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={props.onPageChange}
      disableInitialCallback={true}
      initialPage={props.initialPage}
      forcePage={props.initialPage}
      containerClassName="pagination m-0"
      pageLinkClassName="pagination__link"
      activeClassName="active"
    />
  );
};

PagingBlock.propTypes = {
  initialPage: PT.number.isRequired,
  pageCount: PTS.nullOrNumber,
  onPageChange: PT.func.isRequired
};

export default PagingBlock;