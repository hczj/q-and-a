import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ link, text, classes }) => (
  <Link to={link} className={classes}>
    {text}
  </Link>
);

export default Button;
