import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { requestCorrectAnswer, requestNextQuestion } from '../redux/actions';
import { getQuestions } from '../services/triviaAPI';

class Game extends Component {
  state = {
    questions: '',
    changeColor: false, // estado que muda a cor do botão
    buttonNext: false,
    timer: 30,
    isDisabled: false,
    randomAnswers: [],
    indexQuestion: 0,
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
      const answersList = [...results[0].incorrect_answers,
        results[0].correct_answer];
      const randomAnswersLits = answersList.sort(() => 1 / 2 - Math.random());
      this.setState({ questions: results, randomAnswers: randomAnswersLits });
    }
  };

  handleClickColor = (question) => { // função que muda o estado da cor do botão de acordo com a resposta
    const { dispatch } = this.props;
    const { questions, timer, indexQuestion } = this.state;
    const three = 3;
    const two = 2;
    const one = 1;
    clearInterval(this.timerInterval);
    if (question) {
      const difficulty = () => {
        if (questions[indexQuestion].difficulty === 'hard') {
          return three;
        }
        if (questions[indexQuestion].difficulty === 'medium') {
          return two;
        }
        return one;
      };
      dispatch(requestNextQuestion(timer, difficulty()));
      dispatch(requestCorrectAnswer());
    }
    this.setState((prevState) => ({
      changeColor: !prevState.changeColor, // altera o estado para true ou false, dependendo do estado anterior
      buttonNext: true,
    }));
  };

  // Função que leva para a próxima pergunta:
  nextQuestion = () => {
    const { history } = this.props;
    const { indexQuestion, questions } = this.state;
    const four = 4;
    this.timerQuestions();
    if (indexQuestion < four) {
      const answersList = [...questions[indexQuestion + 1].incorrect_answers,
        questions[indexQuestion + 1].correct_answer];
      const randomAnswersLits = answersList.sort(() => 1 / 2 - Math.random());
      this.setState({
        indexQuestion: indexQuestion + 1,
        timer: 30,
        randomAnswers: randomAnswersLits,
        changeColor: false,
      });
      // this.getTriviaQuestions();
    }
    if (indexQuestion === four) {
      history.push('/feedback');
    }
  };

  timerQuestions = () => {
    const timerNumber = 1000;
    this.timerInterval = setInterval(() => {
      const { timer } = this.state;
      if (timer === 0) {
        clearInterval(this.timerInterval);
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
      indexQuestion,
      timer } = this.state;
    if (!questions) return <p>Loading...</p>;
    return (
      <div>
        <Header />
        <h1 data-testid="question-category">
          { questions[indexQuestion].category }
        </h1>
        <h2 data-testid="question-text">
          { questions[indexQuestion].question }
        </h2>
        <div
          data-testid="answer-options"
        >
          { randomAnswers.map((answers, index) => {
            const isCorrectAnswer = answers === questions[indexQuestion].correct_answer;
            return (
              <button
                key={ answers }
                type="button"
                onClick={ () => this.handleClickColor(isCorrectAnswer) }
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
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    player: state.player,
    assertions: state.player.assertions,
  };
}

export default connect(mapStateToProps)(Game);
