import styles from './SearchResultsBlock.module.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';
import { withTranslation } from 'react-i18next';

import { nullOrNumber } from '@/types';
import { Row } from '@/markup';
import Highlight from './Highlight';

function SearchResultsBlock(props) {
  const { t, search, total } = props;

  if (total == null || !search) return null;

  const foundCountTR = t('movie_search.found.count', { count: total });
  const movieCountTR = t('movie_search.movie.count', { count: total });
  const byTitleTR = t('movie_search.by_title');

  return (
    <Row cls={cn(styles.wrapper, 'mb-lg-2')}>
      <span className="mr-2">
        {foundCountTR}
      </span>

      <Highlight cls="mr-2">
        {total}
      </Highlight>

      <span className="mr-2">
        {movieCountTR}
      </span>

      <span className="mr-2">
        {byTitleTR}
      </span>

      <Highlight isQuoted={true}>
        {search}
      </Highlight>
    </Row>
  );
}

SearchResultsBlock.propTypes = {
  t: PT.func.isRequired,
  search: PT.string,
  total: nullOrNumber
};

export default withTranslation()(SearchResultsBlock);