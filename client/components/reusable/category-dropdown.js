import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const CategoryDropdown = ({ categories }) => {
  if (!categories) return null;
  return (
    <Fragment>
      <option>Select A Category</option>
      {categories.map(category => (
        <option key={category.id} value={+category.id}>
          {category.name}
        </option>
      ))}
    </Fragment>
  );
};

const mapState = state => ({
  categories: state.categories.all
});

export default connect(mapState)(CategoryDropdown);
