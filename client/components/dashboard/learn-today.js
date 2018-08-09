import React, { Component, Fragment } from 'react';
import { fetchCategories } from '../../store';
import { connect } from 'react-redux';

class LearnToday extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { categories, isLoading, firstName } = this.props;

    if (isLoading) return null;
    else
      return (
        <h1 className="title">
          What would you like to learn today, {firstName}?
        </h1>
      );
  }
}

const mapState = state => ({
  categories: state.categories.all,
  isLoading: state.categories.isLoading,
  firstName: state.me.firstName
});

const mapDispatch = dispatch => ({
  getCategories: () => dispatch(fetchCategories())
});

export default connect(mapState, mapDispatch)(LearnToday);
