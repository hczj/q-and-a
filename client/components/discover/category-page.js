import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchCategory } from '../../store';
import { Header, CategoryTopics } from '../../components';

class CategoryPage extends Component {
  componentDidMount() {
    const { categoryId } = this.props.match.params;
    this.props.getCategory(categoryId);
  }

  render() {
    const { isLoading, category } = this.props;
    const { name, imageUrl } = category;

    if (isLoading || !category.id) return null;
    return (
      <Fragment>
        <div className="box">
          <Header title={name} />
          <img src={imageUrl} />
        </div>

        <div className="box">
          <CategoryTopics />
        </div>
      </Fragment>
    );
  }
}

const mapState = state => ({
  category: state.categories.active,
  isLoading: state.categories.isLoading
});

const mapDispatch = dispatch => ({
  getCategory: categoryId => dispatch(fetchCategory(categoryId))
});

export default connect(mapState, mapDispatch)(CategoryPage);
