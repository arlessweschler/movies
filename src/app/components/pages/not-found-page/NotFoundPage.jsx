import React from 'react';
import PT from 'prop-types';
import { Route } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

function NotFoundPage({ t }) {
  return (
    <Route render={function ({ staticContext }) {
      if (staticContext) {
        staticContext.status = 404;
      }
      return (
        <div>
          <p style={{ "color": "white" }}>
            {t('page_404')}
          </p>
        </div>
      );
    }} />
  );
}

NotFoundPage.propTypes = {
  t: PT.func.isRequired
};

export default withTranslation()(NotFoundPage);