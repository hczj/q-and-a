import React, { Fragment, Component } from 'react';
import {
  Queue,
  Header,
  NothingHere,
  AskQuestionButton,
  CategoryDropdown
} from '../../components';
import { connect } from 'react-redux';
import {
  fetchQuestions,
  fetchQuestionsByCategory,
  updateQuestion,
  orderQuestions,
  removeActiveCategory,
  fetchCategory,
  orderQuestionsByCategory
} from '../../store';
import { withRouter } from 'react-router-dom';

class QuestionQueue extends Component {
  componentDidMount() {
    const { getQuestions, category, removeActiveCategory } = this.props;
    if (category) {
      removeActiveCategory();
    }
    getQuestions();
  }

  handleCategoryChange = async event => {
    const categoryId = +event.target.value;
    const {
      getQuestionsByCategory,
      getQuestions,
      removeActiveCategory,
      getCategory
    } = this.props;

    if (isNaN(categoryId)) {
      await getQuestions();
      await removeActiveCategory();
    } else {
      await getQuestionsByCategory(categoryId);
      await getCategory(categoryId);
    }
  };

  upVote = question => {
    question.vote = true;
    this.props.incrementVote(question);
  };

  handleQuestionsSort = query => {
    const { category, orderQuestions, orderQuestionsByCategory } = this.props;
    const categoryId = category.id;

    if (categoryId && query) {
      this.props.history.push(`/questions${query}`);
      orderQuestionsByCategory(categoryId, query);
    } else if (!categoryId && query) {
      this.props.history.push(`/questions${query}`);
      orderQuestions(query);
    } else {
      this.props.history.push(`/questions`);
      orderQuestions();
    }
  };

  render() {
    const { questions } = this.props;
    return (
      <Fragment>
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <Header title="Questions" />
            </div>
            <div className="level-item">
              <AskQuestionButton />
            </div>
          </div>
        </nav>

        <div className="box">
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <Header title="Your Topics" />
              </div>

              <div className="level-item">
                <div className="field">
                  <div className="control">
                    <div className="select">
                      <select onChange={this.handleCategoryChange}>
                        <CategoryDropdown defaultOption="View By Category" />
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="level-right">
              <div className="level-item">
                <p onClick={() => this.handleQuestionsSort('?type=newest')}>
                  newest
                </p>
              </div>
              <div className="level-item">
                <p onClick={() => this.handleQuestionsSort('?type=popular')}>
                  popular
                </p>
              </div>
              <p onClick={() => this.handleQuestionsSort('?type=answered')}>
                answered
              </p>
            </div>
          </nav>

          <hr />

          {questions.length ? <Queue upVote={this.upVote} /> : <NothingHere />}
        </div>
      </Fragment>
    );
  }
}

const mapState = state => ({
  questions: state.questions.all,
  isLoading: state.questions.isLoading,
  category: state.categories.active
});

const mapDispatch = (dispatch, ownProps) => ({
  getQuestions: () => dispatch(fetchQuestions()),
  getQuestionsByCategory: categoryId =>
    dispatch(fetchQuestionsByCategory(categoryId)),
  incrementVote: questionId => dispatch(updateQuestion(questionId)),
  orderQuestions: query =>
    dispatch(orderQuestions(ownProps.history)).then(() =>
      ownProps.history.push(`/questions/${query ? query : ''}`)
    ),
  removeActiveCategory: () => dispatch(removeActiveCategory()),
  getCategory: categoryId => dispatch(fetchCategory(categoryId)),
  orderQuestionsByCategory: (categoryId, query) =>
    dispatch(orderQuestionsByCategory(categoryId, ownProps.history)).then(() =>
      ownProps.history.push(`/questions/${query ? query : ''}`)
    )
});

export default withRouter(connect(mapState, mapDispatch)(QuestionQueue));
