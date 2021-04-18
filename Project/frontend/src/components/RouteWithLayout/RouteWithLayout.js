import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, isDesktop: isDesktop, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout isDesktop={isDesktop}>
          <Component {...matchProps} isDesktop={isDesktop} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
