import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '../pages/_layouts/auth';
import ListLayout from '../pages/_layouts/list';

import { store }  from '../store';

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const { signed } = store.getState().auth;


  if (!signed && isPrivate) {
    return <Redirect to ="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/deliveries" />
  }

  const Layout = signed ? ListLayout : AuthLayout;

  return <Route {...rest} render={props => (
    <Layout>
      <Component {...props}/>
    </Layout>
  )} />;
}


RouteWrapper.prototypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
