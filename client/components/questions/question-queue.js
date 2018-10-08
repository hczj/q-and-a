import React, { Fragment, Component } from 'react';
import {
  Queue,
  Header,
  NothingHere,
  Button,
  CategoryDropdown
} from '../../components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchQuestions,
  fetchQuestionsByCategory,
  removeActiveCategory,
  fetchCategory,
  removeAllQuestions,
  updateQuestion
} from '../../store';

class QuestionQueue extends Component {
  componentDidMount() {
    this.props.removeAllQuestions();
    if (this.props.category) this.props.removeActiveCategory();
    this.props.getQuestions();
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

  closeQuestion = question => {
    question.isActive = false;
    this.props.setQuestionInactive(question);
    this.props.getQuestions();
  };

  render() {
    const { questions, isTeacher, category } = this.props;
    return (
      <Fragment>
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <Header title="Questions" />
            </div>
            <div className="level-item">
              {!isTeacher && (
                <Button
                  link="/ask-a-question"
                  text="Ask a question!"
                  classes="button is-link is-large"
                />
              )}
            </div>
          </div>
        </nav>

        <div className="box">
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <Header
                  title={`${category.name ? category.name : 'Your Topics'}`}
                  size="is-5"
                />
              </div>
            </div>

            <div className="level-right">
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
          </nav>

          <hr />

          {questions.length ? (
            <Queue closeQuestion={this.closeQuestion} />
          ) : (
            <NothingHere />
          )}
        </div>
      </Fragment>
    );
  }
}

const mapState = state => ({
  questions: state.questions.all,
  isLoading: state.questions.isLoading,
  category: state.categories.active,
  isTeacher: state.me.isTeacher
});

const mapDispatch = dispatch => ({
  getQuestions: () => dispatch(fetchQuestions()),
  getQuestionsByCategory: categoryId =>
    dispatch(fetchQuestionsByCategory(categoryId)),
  removeActiveCategory: () => dispatch(removeActiveCategory()),
  getCategory: categoryId => dispatch(fetchCategory(categoryId)),
  removeAllQuestions: () => dispatch(removeAllQuestions()),
  setQuestionInactive: question => dispatch(updateQuestion(question))
});

export default withRouter(connect(mapState, mapDispatch)(QuestionQueue));
