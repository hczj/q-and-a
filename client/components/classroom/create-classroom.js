import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  me,
  fetchQuestion,
  fetchUser,
  removeActiveQuestion,
  removeActiveUser,
  createMessage,
  createClassroom,
  deleteClassroom
} from '../../store';
import { getRoomId } from '../../utils';
import moment from 'moment';

class CreateClassroom extends Component {
  state = {
    room: '',
    questionId: null,
    studentId: null,
    teacherId: null
  };

  async componentDidMount() {
    const {
      loadInitialData,
      getQuestion,
      getUser,
      myId,
      location
    } = this.props;
    await loadInitialData();
    await getUser(location.state.studentId);
    await getQuestion(location.state.questionId);

    this.setState({
      room: getRoomId(myId),
      questionId: location.state.questionId,
      studentId: location.state.studentId,
      teacherId: location.state.teacherId
    });

    const card = document.getElementById('card');
    if (card) card.classList.remove('is-hidden');

    const { room, questionId, studentId, teacherId } = this.state;
    this.props.addRoom({ room, questionId, studentId, teacherId });
  }

  handleInvite = () => {
    const invitation = `Hi ${this.props.user.firstName}. I'm happy to help you with your question: "${this.props.question.title}". Join me in a video call at ${window.location.origin}/classroom/r/${this.state.room}.`;

    this.props.sendInvite({
      content: invitation,
      senderId: this.state.teacherId,
      receiverId: this.state.studentId
    });
  }

  goBack = () => {
    this.props.resetActive();
    this.props.removeRoom(this.state.room);
    this.props.history.goBack();
  };

  render() {
    const { isLoading, question, user } = this.props;
    if (isLoading || !question.id && !user.id) return null;
    return (
      <div className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="column is-6 is-offset-3 is-4-widescreen is-offset-4-widescreen">
              <div className="create-classroom is-hidden" id="card">
                <div className="question-card">
                  <figure className="image is-64x64">
                    <img className="is-rounded" src={user.imageUrl} />
                  </figure>
                  <div className="question-student">{user.name}</div>
                  <div className="question-date">
                    {moment(question.createdAt).fromNow()}
                  </div>
                  <div className="question">{question.title}</div>
                </div>
                <div className="send-invitation">
                  <div className="is-5 title">
                    Invite {user.firstName} to join a classroom
                  </div>
                  <div className="buttons">
                    <Link
                      onClick={this.handleInvite}
                      className="button is-primary"
                      to={{
                        pathname: `classroom/r/${this.state.room}`,
                        state: {
                          room: this.state.room,
                          questionId: this.state.questionId,
                          studentId: this.state.studentId,
                          teacherId: this.state.teacherId
                        }
                      }}
                    >
                      Send
                    </Link>
                    <a onClick={this.goBack} className="button is-light">
                      Cancel
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  myId: state.me.id,
  question: state.questions.active,
  user: state.users.active,
  isLoading: state.users.isLoading
});

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me()),
  getQuestion: questionId => dispatch(fetchQuestion(questionId)),
  getUser: userId => dispatch(fetchUser(userId)),
  sendInvite: data => dispatch(createMessage(data)),
  resetActive: () => {
    dispatch(removeActiveUser());
    dispatch(removeActiveQuestion());
  },
  addRoom: (room, questionId, teacherId) =>
    dispatch(createClassroom(room, questionId, teacherId)),
  removeRoom: room => dispatch(deleteClassroom(room))
});

export default connect(mapState, mapDispatch)(CreateClassroom);
