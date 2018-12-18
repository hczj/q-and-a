import React from 'react';
import { Link } from '@reach/router';

const Button = ({ link, text, classes, state }) => (
  <Link to={link} state={{ state }} className={classes}>
    {text}
  </Link>
);

export default Button;
