import React, { Component, Fragment } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class FeedbackForm extends Component {
  constructor(props) {
    super(props);
    this.state = { isSubmit: false, feedback: '', rating: 0 };
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.feedback);
    this.setState({ isSubmit: true });
    //axios request
  };

  handleChangeRating = event => {
    this.setState({ rating: event });
  };

  handleChangeFeedback = event => {
    this.setState({ feedback: event.target.value });
  };

  render() {
    return (
      <div>
        {!this.state.isSubmit ? (
          <form onSubmit={this.handleSubmit}>
            <StarRatingComponent
              name="rating"
              starCount={5}
              value={this.state.rating}
              onStarClick={this.handleChangeRating}
              required
            />
            <label>
              Feedback:
              <input
                type="text"
                value={this.state.feedback}
                onChange={this.handleChangeFeedback}
              />
            </label>
            <input type="submit" value="Submit" disabled={!this.state.rating} />
          </form>
        ) : (
          <div>
            Thank you for your feedback!
            <Link to="/">
              <button>Dashboard</button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}
