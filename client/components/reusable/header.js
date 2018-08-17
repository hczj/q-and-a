import React from 'react';

export default ({ title, size }) => {
  return <h1 className={`title ${size ? size : 'is-1'}`}>{title}</h1>;
};
