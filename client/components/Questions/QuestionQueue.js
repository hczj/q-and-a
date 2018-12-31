import React, {
  Fragment,
  useState,
  useEffect,
  useReducer,
  useContext
} from 'react';
import axios from 'axios';
import QuestionCard from './QuestionCard';
import { Header, Button, CategoryDropdown } from '../../components';
import { MeContext } from '../../context';

const initialState = {
  questions: [],
  isLoading: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RECEIVE_QUESTIONS':
      return {
        ...state,
        questions: action.questions
      };

    case 'UPDATE_QUESTION':
      return {
        ...state,
        questions: [...state.questions, action.question]
      }

    default:
      return state;
  }
};

const QuestionQueue = props => {
  const { me } = useContext(MeContext);

  const [category, setCategory] = useState({});
  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(`/api/categories`);
      console.log('categories', data);
    } catch (err) {
      console.error(err);
    }
  };

  const [{ questions }, dispatch] = useReducer(reducer, initialState);
  const fetchQuestions = async (categoryId = null) => {
    try {
      const apiPath =
        categoryId !== null
          ? `/api/categories/${categoryId}/questions`
          : `/api/questions`;
      const { data } = await axios.get(apiPath);
      dispatch({
        type: 'RECEIVE_QUESTIONS',
        questions: data
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [category]);

  const handleCategoryChange = event => {
    fetchQuestions(+event.target.value || null);
  }

  const closeQuestion = async question => {
    try {
      const updatedQuestion = { ...question, isActive: false };
      const { data } = await axios.put(
        `/api/questions/${question.id}`,
        updatedQuestion
      );
      dispatch({
        type: 'UPDATE_QUESTION',
        question: updatedQuestion
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <Header title="Questions" />
          </div>
          <div className="level-item">
            {!me.isTeacher && (
              <Button
                link="add"
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
                  <select onChange={handleCategoryChange}>
                    <CategoryDropdown defaultOption="View By Category" />
                  </select>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <hr />

        {questions.map(question => (
          <QuestionCard
            key={question.id}
            question={question}
            isTeacher={me.isTeacher}
            closeQuestion={closeQuestion}
            myId={me.id}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default QuestionQueue;















// class QuestionQueue extends Component {
//   componentDidMount() {
//     this.props.removeAllQuestions();
//     if (this.props.category) this.props.removeActiveCategory();
//     this.props.getQuestions();
//   }

//   handleCategoryChange = async event => {
//     const categoryId = +event.target.value;
//     const {
//       getQuestionsByCategory,
//       getQuestions,
//       removeActiveCategory,
//       getCategory
//     } = this.props;

//     if (isNaN(categoryId)) {
//       await getQuestions();
//       await removeActiveCategory();
//     } else {
//       await getQuestionsByCategory(categoryId);
//       await getCategory(categoryId);
//     }
//   };

//   closeQuestion = question => {
//     question.isActive = false;
//     this.props.setQuestionInactive(question);
//     this.props.getQuestions();
//   };

//   render() {
//     const { questions, isTeacher, category, myId } = this.props;
//     return (
//       <Fragment>
//         <nav className="level">
//           <div className="level-left">
//             <div className="level-item">
//               <Header title="Questions" />
//             </div>
//             <div className="level-item">
//               {!isTeacher && (
//                 <Button
//                   link="add"
//                   text="Ask a question!"
//                   classes="button is-link is-large"
//                 />
//               )}
//             </div>
//           </div>
//         </nav>

//         <div className="box">
//           <nav className="level">
//             <div className="level-left">
//               <div className="level-item">
//                 <Header
//                   title={`${category.name ? category.name : 'Your Topics'}`}
//                   size="is-5"
//                 />
//               </div>
//             </div>

//             <div className="level-right">
//               <div className="field">
//                 <div className="control">
//                   <div className="select">
//                     <select onChange={this.handleCategoryChange}>
//                       <CategoryDropdown defaultOption="View By Category" />
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </nav>

//           <hr />

//           {questions.map(question => (
//             <QuestionCard
//               key={question.id}
//               question={question}
//               isTeacher={isTeacher}
//               closeQuestion={this.closeQuestion}
//               myId={myId}
//             />
//           ))}
//         </div>
//       </Fragment>
//     );
//   }
// }

// const mapState = state => ({
//   questions: state.questions.all,
//   category: state.categories.active,
//   isTeacher: state.me.isTeacher,
//   myId: state.me.id
// });

// const mapDispatch = dispatch => ({
//   getQuestions: () => dispatch(fetchQuestions()),
//   getQuestionsByCategory: categoryId =>
//     dispatch(fetchQuestionsByCategory(categoryId)),
//   removeActiveCategory: () => dispatch(removeActiveCategory()),
//   getCategory: categoryId => dispatch(fetchCategory(categoryId)),
//   removeAllQuestions: () => dispatch(removeAllQuestions()),
//   setQuestionInactive: question => dispatch(updateQuestion(question))
// });

// export default (connect(mapState, mapDispatch)(QuestionQueue));
