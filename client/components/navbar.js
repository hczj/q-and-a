import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <nav className="">
    <Link to="/">Home</Link>
    {isLoggedIn ? (
      <Fragment>
        {/* The navbar will show these links after you log in */}
        <Link to="/question-queue">Question Queue</Link>
        <Link to="/manage">Manage</Link>
        <a href="#" onClick={handleClick}>
          Logout
        </a>
      </Fragment>
    ) : (
      <Fragment>
        {/* The navbar will show these links before you log in */}
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/question-queue">Question Queue</Link>
      </Fragment>
    )}
  </nav>
);

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoggedIn: !!state.me.id,
  isAdmin: !!state.me.isAdmin,
  myId: state.me.id
});

const mapDispatch = dispatch => ({
  handleClick: () => dispatch(logout())
});

export default connect(mapState, mapDispatch)(Navbar);
