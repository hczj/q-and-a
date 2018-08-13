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
                <a href="#">newest</a>
              </div>
              <div className="level-item">
                <a href="#">popular</a>
              </div>
              <div className="level-item">
                <a href="#">unanswered</a>
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
