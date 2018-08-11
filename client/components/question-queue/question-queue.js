import React, { Fragment, Component } from 'react';
import {
  Queue,
  Header,
  NothingHere,
  AskQuestionButton
} from '../../components';
import { connect } from 'react-redux';
import { fetchQuestions, me } from '../../store';

class QuestionQueue extends Component {
  async componentDidMount() {
    const { loadMe, getQuestions } = this.props;
    await loadMe();
    getQuestions(this.props.myId);
  }

  render() {
    const { isLoading, questions } = this.props;
    if (isLoading) return null;
    return (
      <Fragment>
        <Header title="Question Queue" />
        <AskQuestionButton />
        <div className="box">
          {questions.length ? <Queue /> : <NothingHere />}
        </div>
      </Fragment>
    );
  }
}

const mapState = state => ({
  myId: state.me.id,
  questions: state.questions.all,
  isLoading: state.questions.isLoading
});

const mapDispatch = dispatch => ({
  loadMe: () => dispatch(me()),
  getQuestions: myId => dispatch(fetchQuestions(myId))
});

export default connect(mapState, mapDispatch)(QuestionQueue);
