import React from 'react';

const CategoryCard = ({ name, imageUrl }) => {
  return (
    <div className="column">
      <img src={imageUrl} />
      <h1 className="subtitle">{name}</h1>
    </div>
  );
};

export default CategoryCard;
