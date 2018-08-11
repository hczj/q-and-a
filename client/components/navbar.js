import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const toggleNavbarMenu = event => {
  const navbarBurger = event.target;
  const navbarMenu = document.getElementById('navPrimary')

  navbarBurger.classList.toggle('is-active')
  navbarMenu.classList.toggle('is-active')
}

const Navbar = ({ handleClick, isLoggedIn, isAdmin, myId }) => (
  <nav className="navbar is-primary">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item has-background-primary">
          SITE_LOGO
        </Link>
        <div
          className="navbar-burger burger"
          onClick={event => toggleNavbarMenu(event)}
          data-target="navPrimary"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navPrimary" className="navbar-menu">
        <div className="navbar-start">
          <NavLink to="/discover" className="navbar-item" activeClassName="is-active">Discover</NavLink>
          {isLoggedIn ? (
            <Fragment>
              {/* The navbar will show these links after you log in */}
              <NavLink to="/question-qeue" className="navbar-item" activeClassName="is-active">Questions</NavLink>
              <NavLink to="/dashboard" className="navbar-item" activeClassName="is-active">Dashboard</NavLink>
              <NavLink to={`/profile/${myId}`} className="navbar-item" activeClassName="is-active">Profile</NavLink>
              <NavLink to="/manage" className="navbar-item" activeClassName="is-active">Manage</NavLink>
              <a href="#" onClick={handleClick} className="navbar-item">
                Logout
              </a>
            </Fragment>
          ) : (
            <Fragment>
              {/* The navbar will show these links before you log in */}
              <NavLink to="/login" className="navbar-item" activeClassName="is-active">Login</NavLink>
              <NavLink to="/signup" className="navbar-item" activeClassName="is-active">Sign Up</NavLink>
            </Fragment>
          )}
        </div>
      </div>
    </div>
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
