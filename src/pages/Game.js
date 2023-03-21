import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { getQuestions } from '../services/triviaAPI';

class Game extends Component {
  state = {
    questions: '',
    changeColor: false, // estado que muda a cor do botão
    buttonNext: false,
    timer: 30,
    isDisabled: false,
    randomAnswers: [],
  };

  componentDidMount() {
    this.getTriviaQuestions();
    this.timerQuestions();
  }

  getTriviaQuestions = async () => {
    const { history } = this.props;
    const ERROR_STATUS = 3;

    const { results, response_code: responseCode } = await getQuestions();
    if (responseCode === ERROR_STATUS) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      const answersList = [...results[0].incorrect_answers, results[0].correct_answer];
      const randomAnswersLits = answersList.sort(() => 1 / 2 - Math.random());
      this.setState({ questions: results, randomAnswers: randomAnswersLits });
    }
  };

  handleClickColor = () => { // função que muda o estado da cor do botão de acordo com a resposta
    this.setState((prevState) => ({
      changeColor: !prevState.changeColor, // altera o estado para true ou false, dependendo do estado anterior
      buttonNext: true,
    }));
  };

  // Função que leva para a próxima pergunta:
  nextQuestion = () => {
  };

  timerQuestions = () => {
    const timerNumber = 1000;
    const timerInterval = setInterval(() => {
      const { timer } = this.state;
      if (timer === 0) {
        clearInterval(timerInterval);
        this.setState({
          isDisabled: true,
        });
        return;
      }
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, timerNumber);
  };

  render() {
    const {
      questions,
      changeColor,
      buttonNext,
      isDisabled,
      randomAnswers,
      timer } = this.state;
    if (!questions) return <p>Loading...</p>;
    return (
      <div>
        <Header />
        <h1 data-testid="question-category">
          { questions[0].category }
        </h1>
        <h2 data-testid="question-text">
          { questions[0].question }
        </h2>
        <div
          data-testid="answer-options"
        >
          { randomAnswers.map((answers, index) => {
            const isCorrectAnswer = answers === questions[0].correct_answer;
            return (
              <button
                key={ answers }
                type="button"
                onClick={ this.handleClickColor }
                data-testid={ isCorrectAnswer
                  ? 'correct-answer' : `wrong-answer-${index}` }
                style={ // muda a cor do botão de acordo com a resposta
                  changeColor // estado que muda a cor do botão
                    ? {
                      border: `3px solid ${
                        isCorrectAnswer ? 'rgb(6, 240, 15)' : 'red' // se a resposta for correta, a cor do botão será verde, se não, vermelho
                      }`,
                    }
                    : null // se o estado for false, a cor do botão será a padrão
                }
                disabled={ isDisabled }
              >
                {answers}
              </button>
            );
          }) }
        </div>
        {
          buttonNext && (
            <button
              data-testid="btn-next"
              onClick={ this.nextQuestion }
            >
              Next
            </button>
          )
        }
        <p>{ timer }</p>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
