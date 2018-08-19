import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { auth } from '../../store';
import {
  Header,
  OrganizationDropdown,
  ValidateField
  // validateLogin,
  // validateSignup
} from '../../components';

import { validateLogin, validateSignup } from '../reusable/validate-field';

const AuthForm = props => {
  const {
    formName,
    displayName,
    subtitle,
    handleSubmit,
    error,
    pristine,
    submitting,
    history
  } = props;

  return (
    <div>
      <Header title={displayName} size="is-3" />
      <p className="subtitle">{subtitle}</p>
      <div className="box">
        <form onSubmit={handleSubmit} name={formName}>
          {formName === 'signup' && (
            <Fragment>
              <Field
                label="First name"
                name="firstName"
                type="text"
                component={ValidateField}
              />
              <Field
                label="Last name"
                name="lastName"
                type="text"
                component={ValidateField}
              />

              <div className="field">
                <label className="label">Organization</label>
                <div className="control">
                  <Field
                    className="select is-small"
                    label="Organization"
                    name="organizationId"
                    type="select"
                    component="select"
                  >
                    <OrganizationDropdown />
                  </Field>
                </div>
              </div>

              <div className="field">
                <label className="label">Are you a teacher?</label>
                <div className="field-body">
                  <div className="field is-narrow">
                    <div className="control">
                      <label className="radio">
                        <Field
                          name="isTeacher"
                          component="input"
                          type="radio"
                          value="true"
                        />{' '}
                        Yes
                      </label>
                      <label className="radio">
                        <Field
                          name="isTeacher"
                          component="input"
                          type="radio"
                          value="false"
                        />{' '}
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          )}

          <Field
            label="Email"
            name="email"
            type="email"
            component={ValidateField}
          />

          <Field
            label="Password"
            name="password"
            type="password"
            component={ValidateField}
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
    </div>
  );
};

const WrappedLogin = reduxForm({
  form: 'loginForm',
  validate: validateLogin
})(AuthForm);

const WrappedSignup = reduxForm({
  form: 'signupForm',
  validate: validateSignup
})(AuthForm);

const mapLogin = state => ({
  formName: 'login',
  displayName: 'Welcome back!',
  subtitle: 'Please sign in to proceed',
  linkName: 'signup',
  linkDisplayName: 'Sign Up',
  error: state.me.error
});

const mapSignup = state => ({
  formName: 'signup',
  displayName: 'Welcome!',
  subtitle: 'Create an account to join us',
  linkName: 'login',
  linkDisplayName: 'Sign in',
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
        formData.organizationId = event.target.organizationId.value;
        formData.isTeacher = event.target.isTeacher.value;
      }
      dispatch(auth(formData, formName));
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(WrappedLogin);
export const Signup = connect(mapSignup, mapDispatch)(WrappedSignup);
