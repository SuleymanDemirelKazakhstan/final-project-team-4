import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';

import { DoctorProfile as DoctorLayout} from './layouts';
import { Main as MainLayout } from './layouts';

import {
  DoctorProfile as DoctorProfileView,
  Login as LoginView,
  DoctorAdmin as DoctorCabinetView,
  NotFound as NotFoundView,
} from './views';

const Routes = (props) => {
  return (
    <Switch>
      <Redirect exact from="/" to="/doctor/1/user/287016579" />
      <RouteWithLayout
        component={LoginView}
        exact
        layout={MainLayout}
        path="/login"
      />
      <RouteWithLayout
        component={DoctorProfileView}
        exact
        layout={DoctorLayout}
        isDesktop = {props.isDesktop}
        path="/doctor/:id/user/:user_id"
      />
      <RouteWithLayout
        component={DoctorCabinetView}
        exact
        layout={MainLayout}
        isDesktop = {props.isDesktop}
        path="/cabinet/:id"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MainLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" /> 
    </Switch>
  );
};

export default Routes;
