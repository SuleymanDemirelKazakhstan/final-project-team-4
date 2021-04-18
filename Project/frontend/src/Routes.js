import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';

import { DoctorProfile as DoctorLayout} from './layouts';

// import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
//   Dashboard as DashboardView,
  DoctorProfile as DoctorProfileView,
//   UserList as UserListView,
//   SignUp as SignUpView,
//   SignIn as SignInView,
//   NotFound as NotFoundView,
} from './views';

const Routes = (props) => {
  return (
    <Switch>
      <Redirect exact from="/" to="/doctor" />
      {/* <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      /> */}
      <RouteWithLayout
        component={DoctorProfileView}
        exact
        layout={DoctorLayout}
        isDesktop = {props.isDesktop}
        path="/doctor/:id"
      />

      {/* <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      /> */}
      {/* <Redirect to="/not-found" /> */}
    </Switch>
  );
};

export default Routes;
