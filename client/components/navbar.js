import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../store';

const toggleNavbarMenu = event => {
  const navbarBurger = event.target;
  const navbarMenu = document.getElementById('navPrimary')

  navbarBurger.classList.toggle('is-active')
  navbarMenu.classList.toggle('is-active')
}

const Navbar = ({ handleClick, isLoggedIn, isAdmin, me }) => (
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
        <div className="navbar-end">
          {isLoggedIn ? (
            <Fragment>
              {/* The navbar will show these links after you log in */}
              <NavLink to="/discover" className="navbar-item" activeClassName="is-active">Discover</NavLink>
              <NavLink to="/classroom" className="navbar-item" activeClassName="is-active">Classroom</NavLink>
              <NavLink to="/questions" className="navbar-item" activeClassName="is-active">Questions</NavLink>
              {isAdmin && <NavLink to="/manage" className="navbar-item" activeClassName="is-active">Manage</NavLink>}
              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">
                  <img className="navbar-profile-img" src={me.imageUrl} />
                </div>
                <div className="navbar-dropdown">
                  <NavLink to="/dashboard" className="navbar-item navbar-dropdown-header">
                    <span>{me.firstName} {me.lastName}</span>
                    <span>{me.email}</span>
                  </NavLink>
                  <hr className="navbar-divider" />
                  <NavLink to="/dashboard" className="navbar-item" activeClassName="is-active">
                    My Dashboard
                  </NavLink>
                  <NavLink to={`/profile/${me.id}`} className="navbar-item" activeClassName="is-active">
                    My Profile
                  </NavLink>
                  <NavLink to="/dashboard?tab=questions" className="navbar-item" activeClassName="is-active">
                    My Questions
                  </NavLink>
                  <NavLink to="/dashboard?tab=inbox" className="navbar-item" activeClassName="is-active">
                    My Messages
                  </NavLink>
                  <hr className="navbar-divider" />
                  <a href="#" onClick={handleClick} className="navbar-item">
                    Logout
                  </a>
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              {/* The navbar will show these links before you log in */}
              <div className="navbar-item">
                <div className="field is-grouped">
                  <p className="control">
                    <NavLink to="/login" className="button is-light" activeClassName="is-active">Sign in</NavLink>
                  </p>
                  <p className="control">
                    <NavLink to="/signup" className="button is-link" activeClassName="is-active">Sign Up</NavLink>
                  </p>
                </div>
              </div>
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
  me: state.me
});

const mapDispatch = dispatch => ({
  handleClick: () => dispatch(logout())
});

export default connect(mapState, mapDispatch)(Navbar);
