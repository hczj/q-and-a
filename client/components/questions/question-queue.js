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
                <Header title="Your Topics" size="is-4" />
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

          {questions.length ? <Queue /> : <NothingHere />}
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
  removeActiveCategory: () => dispatch(removeActiveCategory()),
  getCategory: categoryId => dispatch(fetchCategory(categoryId))
});

export default withRouter(connect(mapState, mapDispatch)(QuestionQueue));
