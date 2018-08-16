import React, { Component, Fragment } from 'react';
import {
  Header,
  CommentForm,
  CommentCard,
  AnswerQuestionButton,
  UpvoteButton,
  NothingHere
} from '../../components';
import { connect } from 'react-redux';
import { fetchQuestion, deleteComment, updateQuestion } from '../../store';
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

  upVote = question => {
    question.vote = true;
    this.props.incrementVote(question);
  };

  render() {
    const { question, comments, isLoading } = this.props;
    const { topics, description, title } = question;

    if (isLoading) return null;
    return (
      <Fragment>
        <div className="box">
          <Link to="/questions">Back</Link>
          <Header title={title} />
          <div className="tags">
            {topics
              ? topics.map(topic => (
                  <span key={topic.id} className="tag">
                    {topic.name}
                  </span>
                ))
              : ''}
          </div>
          <AnswerQuestionButton />
          <UpvoteButton question={question} upVote={this.upVote} />
          <hr />
          {description}
          <hr />
          <CommentForm questionId={question.id} />
          <hr />
          {comments ? (
            comments.map(comment => (
              <CommentCard
                key={comment.id}
                {...comment}
                removeComment={this.removeComment}
              />
            ))
          ) : (
            <NothingHere />
          )}
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
    dispatch(deleteComment(commentId, questionId)),
  incrementVote: questionId => dispatch(updateQuestion(questionId))
});

export default connect(mapState, mapDispatch)(SingleQuestionView);
