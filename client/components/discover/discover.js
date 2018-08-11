import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Header, NothingHere } from '../../components';
import { fetchCategories } from '../../store';

class Discover extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { isLoading } = this.props;
    if (isLoading) return null;
    return (
      <Fragment>
        <Header title="Discover" />
        <NothingHere />
      </Fragment>
    );
  }
}

const mapState = state => ({
  myId: state.me.id,
  isLoading: state.categories.isLoading
});

const mapDispatch = dispatch => ({
  getCategories: () => dispatch(fetchCategories())
});

export default connect(mapState, mapDispatch)(Discover);
