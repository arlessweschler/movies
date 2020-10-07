import React from 'react';
import ReactPaginate from "react-paginate";

export default function MoviesPaging({pageCount, onPageChange, initialPage}) {
  return (
    <ReactPaginate
        previousLabel="&larr;"
        nextLabel="&rarr;"
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        disableInitialCallback={true}
        initialPage={initialPage}
        forcePage={initialPage}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
  );
}