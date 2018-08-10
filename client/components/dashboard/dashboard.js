import React, { Fragment, Component } from 'react';
import { LearnToday, ActiveQuestions, Header } from '../../components';
import { connect } from 'react-redux';
import { fetchQuestions } from '../../store';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getQuestions(this.props.myId);
  }

  render() {
    const { isLoading } = this.props;
    if (isLoading) return null;
    return (
      <Fragment>
        <Header title="Dashboard" />
        <LearnToday />
        <ActiveQuestions />
      </Fragment>
    );
  }
}

const mapState = state => ({
  myId: state.me.id,
  isLoading: state.questions.isLoading
});

const mapDispatch = dispatch => ({
  getQuestions: myId => dispatch(fetchQuestions(myId))
});

export default connect(mapState, mapDispatch)(Dashboard);
