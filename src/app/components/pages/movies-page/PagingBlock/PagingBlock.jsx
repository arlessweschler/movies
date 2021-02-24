import styles from './PagingBlock.module.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';
import ReactPaginate from 'react-paginate';

import { nullOrNumber } from '@/types';
import withMoviesNav from '@/hocs/withMoviesNav';

function PagingBlock(props) {
  const {
    containerCls = '',
    wrapperCls = '',
    initialPage,
    pageCount,
    linkPage
  } = props;

  const labelProps = {
    previousLabel: '<-',
    nextLabel: '->',
    breakLabel: '...'
  };

  const baseStyleProps = {
    containerClassName: cn(styles.container, containerCls, 'pagination'),
    activeClassName: cn(styles.active, 'active'),
    disabledClassName: cn(styles.disabled, 'active'),
    breakClassName: 'break'
  };

  // specify link classes (because of bootstrap "reboot" styles for "a" tags without classes)
  const linkCls = cn(styles.link, 'pagination__link');
  const linkStyleProps = {
    pageLinkClassName: linkCls,
    activeLinkClassName: linkCls,
    previousLinkClassName: linkCls,
    nextLinkClassName: linkCls,
    breakLinkClassName: linkCls
  };

  return (
    <div className={cn(styles.wrapper, wrapperCls)}>
      <ReactPaginate
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        disableInitialCallback={true}
        onPageChange={linkPage}
        forcePage={initialPage}
        initialPage={initialPage}
        pageCount={pageCount}
        {...labelProps}
        {...baseStyleProps}
        {...linkStyleProps}
      />
    </div>
  );
}

PagingBlock.propTypes = {
  containerCls: PT.string,
  wrapperCls: PT.string,
  linkPage: PT.func.isRequired,
  initialPage: PT.number.isRequired,
  pageCount: nullOrNumber
};

export default withMoviesNav(PagingBlock);