import React, { Fragment, Component } from 'react';
import { Header, ActiveQuestions, MyTopics } from '../../components';
import { connect } from 'react-redux';
import { fetchQuestions } from '../../store';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getQuestions();
  }

  render() {
    const { isLoading, myId, questions, topics } = this.props;
    if (isLoading) return null;
    return (
      <Fragment>
        <Header title="Dashboard" />
        <MyTopics topics={topics} />
        <ActiveQuestions questions={questions} myId={myId} />
      </Fragment>
    );
  }
}

const mapState = state => ({
  isLoading: state.questions.isLoading,
  myId: state.me.id,
  questions: state.questions.all,
  topics: state.me.topics
});

const mapDispatch = dispatch => ({
  getQuestions: myId => dispatch(fetchQuestions(myId))
});

export default connect(mapState, mapDispatch)(Dashboard);
