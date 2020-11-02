import './PagingBlock.scss';

import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';
import ReactPaginate from "react-paginate";

import PTS from 'app_services/PropTypesService';
import withMoviesNav from 'app_hocs/withMoviesNav';

function PagingBlock(props) {
  const { cls, initialPage, pageCount, linkPage } = props;

  const cls_base = 'pagination';
  const b = b_.B({ modSeparator: '--' }).with(cls_base);

  return (
    <ReactPaginate
      previousLabel="&larr;"
      nextLabel="&rarr;"
      breakLabel="..."
      breakClassName="break-me"
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      onPageChange={linkPage}
      disableInitialCallback={true}
      initialPage={initialPage}
      forcePage={initialPage}
      containerClassName={cn(b(), cls)}
      activeClassName="active"
      // we need specify that classes because of bootstrap reboot styles (for not to override them)
      pageLinkClassName={b('link')}
      previousLinkClassName={b('link', { prev: true })}
      nextLinkClassName={b('link', { next: true })}
      breakLinkClassName={b('link', { break: true })}
    />
  );
};

PagingBlock.propTypes = {
  linkPage: PT.func.isRequired,
  cls: PT.string,

  initialPage: PT.number.isRequired,
  pageCount: PTS.nullOrNumber
};

export default withMoviesNav(PagingBlock);