import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { logout } from '../store';

class Navbar extends Component {
  toggleNavbarMenu = event => {
    const navbarBurger = event.target;
    const navbarMenu = document.getElementById('navPrimary');
    navbarBurger.classList.toggle('is-active');
    navbarMenu.classList.toggle('is-active');
  };

  closeNavbarMenu = event => {
    const navbarItem = event.target;
    const navbarMenu = document.getElementById('navPrimary');
    document.getElementById('burger').classList.remove('is-active');
    navbarMenu.classList.remove('is-active');
  };

  render() {
    const { handleLogout, isLoggedIn, isAdmin, isTeacher, me } = this.props;
    return (
      <nav className="navbar is-primary">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item has-background-primary">
              Q&A
            </Link>
            <div
              id="burger"
              className="navbar-burger burger"
              onClick={this.toggleNavbarMenu}
              data-target="navPrimary"
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div id="navPrimary" className="navbar-menu">
            <div className="navbar-end">
              {isLoggedIn ? (
                <Fragment>
                  {/* The navbar will show these links after you log in */}
                  <NavLink
                    to="/questions"
                    className="navbar-item"
                    activeClassName="is-active"
                    onClick={this.closeNavbarMenu}
                  >
                    <span>Questions</span>
                    <span className="icon">
                      <i className="fas fa-question-circle" />
                    </span>
                  </NavLink>
                  <NavLink
                    to="/messages"
                    className="navbar-item"
                    activeClassName="is-active"
                    onClick={this.closeNavbarMenu}
                  >
                    <span>Messages</span>
                    <span className="icon">
                      <i className="fas fa-comment-dots" />
                    </span>
                  </NavLink>
                  <div className="navbar-item has-dropdown is-hoverable">
                    <div className="navbar-link">
                      <img className="navbar-profile-img" src={me.imageUrl} />
                    </div>
                    <div className="navbar-dropdown">
                      <NavLink
                        exact
                        to="/dashboard"
                        className="navbar-item navbar-dropdown-header"
                        onClick={this.closeNavbarMenu}
                      >
                        <span>
                          {me.firstName} {me.lastName}
                        </span>
                        <span>{me.email}</span>
                      </NavLink>
                      <hr className="navbar-divider" />
                      <NavLink
                        exact
                        to="/dashboard"
                        className="navbar-item"
                        activeClassName="is-active"
                        onClick={this.closeNavbarMenu}
                      >
                        My Dashboard
                      </NavLink>
                      <NavLink
                        to={`/profile/${me.id}`}
                        className="navbar-item"
                        activeClassName="is-active"
                        onClick={this.closeNavbarMenu}
                      >
                        My Profile
                      </NavLink>
                      {isTeacher ? (
                        <NavLink
                          to="/dashboard/feedback"
                          className="navbar-item"
                          activeClassName="is-active"
                        >
                          My Feedback
                        </NavLink>
                      ) : (
                        <NavLink
                          to="/questions"
                          className="navbar-item"
                          activeClassName="is-active"
                        >
                          My Questions
                        </NavLink>
                      )}
                      <hr className="navbar-divider" />
                      {isAdmin && (
                        <Fragment>
                          <NavLink
                            to="/manage"
                            className="navbar-item"
                            activeClassName="is-active"
                            onClick={this.closeNavbarMenu}
                          >
                            Manage
                          </NavLink>
                          <hr className="navbar-divider" />
                        </Fragment>
                      )}
                      <a
                        href="#"
                        onClick={handleLogout}
                        className="navbar-item"
                      >
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
                        <NavLink
                          to="/login"
                          className="button is-light"
                          activeClassName="is-active"
                        >
                          Sign in
                        </NavLink>
                      </p>
                      <p className="control">
                        <NavLink
                          to="/signup"
                          className="button is-link"
                          activeClassName="is-active"
                        >
                          Sign Up
                        </NavLink>
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
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoggedIn: !!state.me.id,
  isAdmin: state.me.isAdmin,
  isTeacher: state.me.isTeacher,
  me: state.me
});

const mapDispatch = dispatch => ({
  handleLogout: () => dispatch(logout())
});

export default withRouter(connect(mapState, mapDispatch)(Navbar));
