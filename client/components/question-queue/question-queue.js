import React, { Fragment, Component } from 'react';
import { Queue, Header } from '../../components';
import { connect } from 'react-redux';
import { fetchQuestions, me } from '../../store';

class QuestionQueue extends Component {
  async componentDidMount() {
    const { loadMe, getQuestions } = this.props;
    await loadMe();
    getQuestions(this.props.myId);
  }

  render() {
    const { isLoading } = this.props;
    if (isLoading) return null;
    return (
      <Fragment>
        <Header title="Question Queue" />
        <Queue />
      </Fragment>
    );
  }
}

const mapState = state => ({
  myId: state.me.id,
  isLoading: state.questions.isLoading
});

const mapDispatch = dispatch => ({
  loadMe: () => dispatch(me()),
  getQuestions: myId => dispatch(fetchQuestions(myId))
});

export default connect(mapState, mapDispatch)(QuestionQueue);
