import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchCategoriesByUser, me } from '../../store/';

class CategoryDropdown extends Component {
  async componentDidMount() {
    const { getUserCategories, loadMe } = this.props;
    await loadMe();
    getUserCategories(this.props.myId);
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
  myId: state.me.id,
  categories: state.categories.all,
  isLoading: state.categories.isLoading
});

const mapDispatch = dispatch => ({
  loadMe: () => dispatch(me()),
  getUserCategories: myId => dispatch(fetchCategoriesByUser(myId))
});

export default connect(mapState, mapDispatch)(CategoryDropdown);
