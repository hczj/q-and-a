import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ id, name, imageUrl }) => {
  return (
    <div className="column">
      <img src={imageUrl} />
      <Link to={`/category/${id}`}>
        <h1 className="subtitle">{name}</h1>
      </Link>
    </div>
  );
};

export default CategoryCard;
