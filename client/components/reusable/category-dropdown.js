import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../../store/';

class CategoryDropdown extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { categories, isLoading } = this.props;

    if (isLoading) return null;
    else
      return (
        <Fragment>
          {categories.map(category => (
            <option key={category.id} value={+category.id}>
              {category.name}
            </option>
          ))}
        </Fragment>
      );
  }
}

const mapState = state => ({
  categories: state.categories.all,
  isLoading: state.categories.isLoading
});

const mapDispatch = dispatch => ({
  getCategories: () => dispatch(fetchCategories())
});

export default connect(mapState, mapDispatch)(CategoryDropdown);
