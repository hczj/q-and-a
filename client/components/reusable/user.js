import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const User = props => (
  <Fragment>
    {props.children(props.me)}
  </Fragment>
);

User.propTypes = {
  children: PropTypes.func.isRequired
};

const mapState = state => ({
  me: state.me
});

export default connect(mapState)(User);
