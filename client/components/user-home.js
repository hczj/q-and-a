import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const UserHome = props => {
  const { email } = props;

  return (
    <div>
      <h3>Welcome, {email || 'GUEST'}</h3>
    </div>
  );
};

const mapState = state => {
  return {
    email: state.me.email
  };
};

export default connect(mapState)(UserHome);
