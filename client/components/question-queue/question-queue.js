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
  fetchCategoriesByUser,
  fetchQuestionsByCategory,
  me
} from '../../store';

class QuestionQueue extends Component {
  async componentDidMount() {
    const { loadMe, getQuestions, getUserCategories } = this.props;
    await loadMe();
    getQuestions(this.props.myId);
    getUserCategories(this.props.myId);
  }

  handleCategoryChange = event => {
    const categoryId = +event.target.value;
    const { getQuestionsByCategory, getQuestions } = this.props;

    if (isNaN(categoryId)) {
      getQuestions(this.props.myId);
    } else {
      getQuestionsByCategory(categoryId);
    }
  };

  render() {
    const { questions } = this.props;
    return (
      <Fragment>
        <Header title="Questions" />
        <AskQuestionButton />
        <div className="box">
          <Header title="Your Topics" />

          <div className="field">
            <div className="control">
              <div className="select">
                <select onChange={this.handleCategoryChange}>
                  <CategoryDropdown defaultOption="View By Category" />
                </select>
              </div>
            </div>
          </div>

          <a href="#">newest</a>
          <a href="#">popular</a>
          <a href="#">unanswered</a>

          <hr />

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
  getQuestions: myId => dispatch(fetchQuestions(myId)),
  getUserCategories: myId => dispatch(fetchCategoriesByUser(myId)),
  getQuestionsByCategory: categoryId =>
    dispatch(fetchQuestionsByCategory(categoryId))
});

export default connect(mapState, mapDispatch)(QuestionQueue);
