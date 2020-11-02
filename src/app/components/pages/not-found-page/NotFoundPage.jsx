import React from 'react';
import PT from 'prop-types';
import { Route } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import { Message } from 'app_components/layout';

function NotFoundPage({ t }) {
  return (
    <Route render={function ({ staticContext }) {
      if (staticContext) {
        staticContext.status = 404;
      }
      return (<Message text={t('page_404')} />);
    }} />
  );
}

NotFoundPage.propTypes = {
  t: PT.func.isRequired
};

export default withTranslation()(NotFoundPage);