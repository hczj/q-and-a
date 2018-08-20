import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ link, text, classes, state }) => (
  <Link to={{ pathname: link, state: state }} className={classes}>
    {text}
  </Link>
);

export default Button;
