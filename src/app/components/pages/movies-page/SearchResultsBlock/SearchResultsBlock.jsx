import './SearchResultsBlock.scss';

import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';
import { withTranslation } from 'react-i18next';

import PTS from '@/services/PropTypesService';
import { Row } from '@/markup';

function SearchResultsBlock(props) {
  const { t, search, total } = props;
  const b = b_.with('search-results');
  const quotes = (
    <span className={b('quotes')}>
      &quot;
    </span>
  );

  if (total == null || !search) return null;

  return (
    <Row cls={cn(b(), 'mb-lg-2')}>
      <span>
        {t('movie_search.found.count', { count: total })}
      </span>

      <span className={b('highlight')}>
        {total}
      </span>

      <span>
        {t('movie_search.movie.count', { count: total })}
      </span>

      <span>
        {t('movie_search.by_title')}
      </span>

      <span className={b('highlight')}>
        {quotes}
        {search}
        {quotes}
      </span>
    </Row>
  );
}

SearchResultsBlock.propTypes = {
  t: PT.func.isRequired,
  search: PT.string,
  total: PTS.nullOrNumber
};

export default withTranslation()(SearchResultsBlock);