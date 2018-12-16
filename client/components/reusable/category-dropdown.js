import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

const CategoryDropdown = props => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/api/categories');
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Fragment>
      <option>{props.defaultOption}</option>
      {categories.map(category => (
        <option key={category.id} value={+category.id}>
          {category.name}
        </option>
      ))}
    </Fragment>
  );
};

export default CategoryDropdown;
