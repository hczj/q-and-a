import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navbar, User } from '../components';
import { logout } from '../store';

const SiteHeader = props => (
  <User>
    {me => (
      <header className="header">
        <Navbar {...props} me={me} />
        <div className="shapes">
          <span />
          <span />
        </div>
      </header>
    )}
  </User>
);

const mapDispatch = dispatch => ({
  handleLogout: () => dispatch(logout())
});

export default withRouter(connect(null, mapDispatch)(SiteHeader));
