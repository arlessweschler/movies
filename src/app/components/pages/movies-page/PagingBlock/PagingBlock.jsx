import './PagingBlock.scss';

import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';
import ReactPaginate from 'react-paginate';

import { nullOrNumber } from '@/types';
import withMoviesNav from '@/hocs/withMoviesNav';

function PagingBlock(props) {
  const {
    cls, initialPage, pageCount, linkPage
  } = props;

  const b = b_.B({ modSeparator: '--' }).with('pagination');

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
      activeLinkClassName={b('link', { active: true })}
      previousLinkClassName={b('link', { prev: true })}
      nextLinkClassName={b('link', { next: true })}
      breakLinkClassName={b('link', { break: true })}
    />
  );
}

PagingBlock.propTypes = {
  linkPage: PT.func.isRequired,
  cls: PT.string,

  initialPage: PT.number.isRequired,
  pageCount: nullOrNumber
};

export default withMoviesNav(PagingBlock);