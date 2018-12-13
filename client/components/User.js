import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const User = props => (
  <div {...props}>
    {props.children}
  </div>
);

// User.propTypes = {
//   children: PropTypes.func.isRequired
// };

const mapState = state => ({
  me: state.me
});

export default connect(mapState)(User);
