import React from 'react';
import { Match } from '@reach/router';
import { Login, Signup } from './AuthForm';

const Auth = () => (
  <div className="columns">
    <div className="column is-6 is-4-desktop is-offset-3 is-offset-4-desktop">
      <Match path="/signup">
        {props => (props.match ? <Signup /> : <Login />)}
      </Match>
    </div>
  </div>
);

export default Auth;
