import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { auth } from '../store';

const AuthForm = props => {
  const {
    name,
    displayName,
    linkName,
    linkDisplayName,
    subtitle,
    handleSubmit,
    error,
    pristine,
    submitting,
    history
  } = props;

  return (
    <div>
      <h1>{displayName}</h1>
      <p>{subtitle}</p>
      <div>
        <form onSubmit={handleSubmit} name={name}>
          {name === 'signup' && (
            <Fragment>
              <label htmlFor="firstName">First Name</label>
              <Field
                label="First Name"
                name="firstName"
                type="text"
                component="input"
              />

              <label htmlFor="lName">Last Name</label>
              <Field
                label="Last Name"
                name="lastName"
                type="text"
                component="input"
              />
            </Fragment>
          )}

          <label htmlFor="email">Email</label>
          <Field label="Email" name="email" type="email" component="input" />

          <label htmlFor="password">Password</label>
          <Field
            label="Password"
            name="password"
            type="password"
            component="input"
          />

          <div className="field is-grouped">
            <div className="control">
              <button
                type="submit"
                className="button is-link"
                disabled={pristine || submitting}
              >
                Submit
              </button>
            </div>
            <div className="control">
              <button
                type="button"
                className="button is-light"
                onClick={() => history.goBack()}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
      <p className="">
        <Link to={`/${linkName}`}>{linkDisplayName}</Link>&nbsp;·&nbsp;
        <a href="/auth/google">{displayName} with Google</a>
      </p>
    </div>
  );
};

const WrappedAuthForm = reduxForm({
  form: 'auth'
  // validate: validateAuth
})(AuthForm);

const mapLogin = state => ({
  name: 'login',
  displayName: 'Login',
  subtitle: 'Please log in to proceed',
  linkName: 'signup',
  linkDisplayName: 'Sign Up',
  error: state.me.error
});

const mapSignup = state => ({
  name: 'signup',
  displayName: 'Sign Up',
  subtitle: 'Create an account',
  linkName: 'login',
  linkDisplayName: 'Login',
  error: state.me.error
});

const mapDispatch = dispatch => {
  return {
    handleSubmit(event) {
      event.preventDefault();
      const formName = event.target.name;
      const formData = {
        email: event.target.email.value,
        password: event.target.password.value
      };
      if (formName === 'signup') {
        formData.firstName = event.target.firstName.value;
        formData.lastName = event.target.lastName.value;
      }
      dispatch(auth(formData, formName));
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(WrappedAuthForm);
export const Signup = connect(mapSignup, mapDispatch)(WrappedAuthForm);
