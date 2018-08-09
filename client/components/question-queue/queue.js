import React, { Component } from 'react';
import { Question, QuestionForm } from '../../components';
import { fetchQuestions } from '../../store';
import { connect } from 'react-redux';

const mapState = state => ({
  questions: state.questions
});

const mapDispatch = dispatch => ({
  getQuestions: () => dispatch(fetchQuestions())
});

class Queue extends Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  render() {
    const { questions } = this.props;
    const { isLoading, all } = questions;

    if (!isLoading) return null;
    else if (isLoading) {
      return (
        <div>
          <QuestionForm />
          <div>
            {all.map(question => <Question key={question.id} {...question} />)}
          </div>
        </div>
      );
    }
  }
}

export default connect(mapState, mapDispatch)(Queue);
