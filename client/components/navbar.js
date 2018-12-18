import React, { Fragment, useContext } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import { Logo } from '../components';
import { MeContext } from '../context';

const NavLink = ({ extraClassNames, ...rest }) => (
  <Link
    {...rest}
    getProps={({ isCurrent }) => {
      return {
        className: `navbar-item ${extraClassNames} ${
          isCurrent ? 'is-active' : null
        }`
      };
    }}
  />
);

const Navbar = props => {
  const me = useContext(MeContext);

  const toggleNavbarMenu = event => {
    const navbarBurger = event.target;
    const navbarMenu = document.getElementById('navPrimary');
    navbarBurger.classList.toggle('is-active');
    navbarMenu.classList.toggle('is-active');
  };

  const closeNavbarMenu = () => {
    const navbarMenu = document.getElementById('navPrimary');
    document.getElementById('burger').classList.remove('is-active');
    navbarMenu.classList.remove('is-active');
  };

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="navbar is-primary" style={props.bgColor}>
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item has-background-primary">
            <Logo />
          </Link>
          <div
            id="burger"
            className="navbar-burger burger"
            onClick={toggleNavbarMenu}
            data-target="navPrimary"
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div id="navPrimary" className="navbar-menu">
          <div className="navbar-end">
            {me.id ? (
              <Fragment>
                <NavLink to="/questions" onClick={closeNavbarMenu}>
                  <span>Questions</span>
                  <span className="icon">
                    <i className="fas fa-question-circle" />
                  </span>
                </NavLink>
                <NavLink to="/messages" onClick={closeNavbarMenu}>
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
                      to="/dashboard"
                      extraClassNames="navbar-dropdown-header"
                      onClick={closeNavbarMenu}
                    >
                      <span>
                        {me.firstName} {me.lastName}
                      </span>
                      <span>{me.email}</span>
                    </NavLink>
                    <hr className="navbar-divider" />
                    <NavLink to="/dashboard" onClick={closeNavbarMenu}>
                      My Dashboard
                    </NavLink>
                    <NavLink to={`/profile/${me.id}`} onClick={closeNavbarMenu}>
                      My Profile
                    </NavLink>
                    {me.isTeacher ? (
                      <NavLink to="/dashboard/feedback">My Feedback</NavLink>
                    ) : (
                      <NavLink to="/questions">My Questions</NavLink>
                    )}
                    <hr className="navbar-divider" />
                    {me.isAdmin && (
                      <Fragment>
                        <NavLink to="/manage" onClick={closeNavbarMenu}>
                          Manage
                        </NavLink>
                        <hr className="navbar-divider" />
                      </Fragment>
                    )}
                    <a href="#" onClick={handleLogout} className="navbar-item">
                      Logout
                    </a>
                  </div>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="navbar-item">
                  <div className="field is-grouped">
                    <p className="control">
                      <NavLink to="/login" extraClassNames="button is-light">
                        Sign in
                      </NavLink>
                    </p>
                    <p className="control">
                      <NavLink to="/signup" extraClassNames="button is-link">
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
};

export default Navbar;
