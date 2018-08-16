import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../../store';

class CategoryDropdown extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { defaultOption, categories } = this.props;
    if (!categories) return null;
    return (
      <Fragment>
        <option>{defaultOption}</option>
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
  categories: state.categories.all
});

const mapDispatch = dispatch => ({
  getCategories: () => dispatch(fetchCategories())
});

export default connect(mapState, mapDispatch)(CategoryDropdown);
