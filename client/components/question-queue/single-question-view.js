import React, { Component, Fragment } from 'react';
import { Header, CommentForm, CommentCard } from '../../components';
import { connect } from 'react-redux';
import { fetchQuestion, deleteComment } from '../../store';
import { Link } from 'react-router-dom';

class SingleQuestionView extends Component {
  componentDidMount() {
    this.props.getQuestion(this.props.match.params.questionId);
  }

  removeComment = commentId => {
    const { question } = this.props;
    let questionId = question.id;
    this.props.removeComment(commentId, questionId);
  };

  render() {
    const { question, comments, isLoading } = this.props;

    if (isLoading) return null;
    return (
      <Fragment>
        <div className="box">
          <Link to="/questions">Back</Link>
          <Header title={question.title} />
          <hr />
          {question.description}
          <hr />
          <CommentForm questionId={question.id} />
          <hr />
          {comments
            ? comments.map(comment => (
                <CommentCard
                  key={comment.id}
                  {...comment}
                  removeComment={this.removeComment}
                />
              ))
            : ''}
        </div>
      </Fragment>
    );
  }
}

const mapState = state => ({
  isLoading: state.questions.isLoading,
  question: state.questions.active,
  comments: state.questions.active.comments
});

const mapDispatch = dispatch => ({
  getQuestion: questionId => dispatch(fetchQuestion(questionId)),
  removeComment: (commentId, questionId) =>
    dispatch(deleteComment(commentId, questionId))
});

export default connect(mapState, mapDispatch)(SingleQuestionView);
