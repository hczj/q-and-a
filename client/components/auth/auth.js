import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Signup } from '../../components';

const Auth = () => (
  <div className="columns">
    <div className="column is-6 is-4-desktop is-offset-3 is-offset-4-desktop">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  </div>
);

export default Auth;
