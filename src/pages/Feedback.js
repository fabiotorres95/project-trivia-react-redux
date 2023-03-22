import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const MIN_LENGTH_ANSWERS = 3;

    return (
      <>
        <h1 data-testid="feedback-text"> Pag de Feedback </h1>
        <Header />
        {
          assertions >= MIN_LENGTH_ANSWERS
            ? (
              <p
                data-testid="feedback-text"
                className="feedbackTextWD"
              >
                Well Done!
              </p>
            )
            : (
              <p
                data-testid="feedback-text"
                className="feedbackTextCB"
              >
                Could be better...
              </p>
            )
        }
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    name: state.player.name,
    assertions: state.player.assertions,
    email: state.player.gravatarEmail,
    score: state.player.score,
  };
}
export default connect(mapStateToProps)(Feedback);
