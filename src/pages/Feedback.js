import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { requestPlayAgain } from '../redux/actions';

class Feedback extends Component {
  playAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(requestPlayAgain());
    history.push('/');
  };

  render() {
    const { assertions, score, history } = this.props;
    const MIN_LENGTH_ANSWERS = 3;

    return (
      <>
        <h1 data-testid="feedback-text"> Pag de Feedback </h1>
        <Header />
        <div>
          <h3>Placar Final: </h3>
          <h3 data-testid="feedback-total-score">{ score }</h3>
          <p>Respostas Corretas: </p>
          <p data-testid="feedback-total-question">{ assertions }</p>
          {assertions >= MIN_LENGTH_ANSWERS
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
            )}
        </div>
        <button
          data-testid="btn-play-again"
          onClick={ this.playAgain }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
        <button
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Home
        </button>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
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
