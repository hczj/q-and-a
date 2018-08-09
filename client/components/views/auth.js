import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { auth } from '../../store';
import { Login, Signup } from '../../components';

class Auth extends Component {
  render() {
    return (
      <section className="">
        <div className="">
          <div className="">
            <div className="">
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
              </Switch>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapState = state => ({
  isLoggedIn: !!state.me.isLoggedIn
});

const mapDispatch = dispatch => ({});

export default connect(mapState)(Auth);
