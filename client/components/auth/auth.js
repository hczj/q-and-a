import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { auth } from '../../store';
import { Login, Signup } from '../../components';

class Auth extends Component {
  render() {
    return (
      <div className="columns">
        <div className="column is-6 is-4-desktop is-offset-3 is-offset-4-desktop">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  isLoggedIn: !!state.me.isLoggedIn
});

const mapDispatch = dispatch => ({});

export default connect(mapState)(Auth);
