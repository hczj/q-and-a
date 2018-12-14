import React from 'react';
import { connect } from 'react-redux';
import { Navbar, User } from '../components';

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

export default connect(null, mapDispatch)(SiteHeader);
