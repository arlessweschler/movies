import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { renderRoutes } from 'react-router-config';

import { Layout } from 'app_components/layout';
import i18n from 'app_settings_i18n';

const RootRoute = (props) => {
  const { route, store } = props;

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Layout>
          {renderRoutes(route.routes)}
        </Layout>
      </I18nextProvider>
    </Provider>
  );
};

RootRoute.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.array
  }).isRequired,
  store: PropTypes.object.isRequired
};

export default RootRoute;