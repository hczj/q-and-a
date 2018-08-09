import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const UserHome = props => {
  const { email, firstName, lastName } = props;
  const name = `${firstName} ${lastName}`;

  return (
    <div>
      <h1 className="title is-1">Welcome, {firstName || 'GUEST'}</h1>
      <p className="subtitle is-3">{email}</p>
    </div>
  );
};

const mapState = state => ({
  email: state.me.email,
  firstName: state.me.firstName,
  lastName: state.me.lastName
})

export default connect(mapState)(UserHome);
