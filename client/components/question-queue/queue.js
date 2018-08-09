import React, { Component, Fragment } from 'react';
import { Question } from '../../components';
import { fetchQuestions } from '../../store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Queue extends Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  render() {
    const { questions } = this.props;
    const { isLoading, all } = questions;

    if (isLoading) return null;
    else {
      return (
        <Fragment>
          <Link to="/ask-a-question">
            <button className="button is-link" type="button">
              Ask a question!
            </button>
          </Link>
          <div>
            {all.map(question => <Question key={question.id} {...question} />)}
          </div>
        </Fragment>
      );
    }
  }
}

const mapState = state => ({
  questions: state.questions
});

const mapDispatch = dispatch => ({
  getQuestions: () => dispatch(fetchQuestions())
});

export default connect(mapState, mapDispatch)(Queue);
