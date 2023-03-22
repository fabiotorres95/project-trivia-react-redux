import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getQuestions } from '../services/triviaAPI';
import { requestNextQuestion, requestCorrectAnswer } from '../redux/actions';

class Game extends Component {
  state = {
    questions: '',
    answered: false, // estado que muda a cor do botão
    timer: 30,
    isDisabled: false,
    indexQuestion: 0,
  };

  async componentDidMount() {
    await this.getTriviaQuestions();
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
      const randomizedQuestions = results.map((question) => ({
        ...question,
        randomizedAnswers: [
          ...question.incorrect_answers,
          question.correct_answer,
        ].sort(() => 1 / 2 - Math.random()),
      }));

      this.setState({ questions: randomizedQuestions });
    }
  };

  handleClickColor = (question) => { // função que muda o estado da cor do botão de acordo com a resposta
    const { dispatch } = this.props;
    const { questions, indexQuestion, timer } = this.state;
    const currentQuestion = questions[indexQuestion];
    const three = 3;
    const two = 2;
    const one = 1;
    clearInterval(this.timerInterval);
    if (question) {
      const difficulty = () => {
        if (currentQuestion.difficulty === 'hard') {
          return three;
        }
        if (currentQuestion.difficulty === 'medium') {
          return two;
        }
        return one;
      };
      dispatch(requestNextQuestion(timer, difficulty()));
      dispatch(requestCorrectAnswer());
    }
    this.setState({
      answered: true,
    });
  };

  // Função que leva para a próxima pergunta:
  nextQuestion = async () => {
    const { history } = this.props;
    const { indexQuestion, questions } = this.state;
    this.setState({
      timer: 30,
      answered: false,
    });
    if (indexQuestion < questions.length - 1) {
      this.setState({
        indexQuestion: indexQuestion + 1,
      });
    } else {
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
          timer: -1,
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
      answered,
      isDisabled,
      indexQuestion,
      timer } = this.state;
    if (!questions) return <p>Loading...</p>;

    const currentQuestion = questions[indexQuestion];

    // Função que substitui os caracteres especiais por seus respectivos caracteres:
    const questionText = currentQuestion.question.replace(/&[^;]+;/g, (match) => {
      switch (match) {
      case '&quot;':
        return '"';
      case '&amp;':
        return '&';
      case '&#039;':
      case '&apos;':
        return '\'';
      default:
        return match;
      }
    });

    return (
      <div>
        <Header />
        <h1 data-testid="question-category">
          { currentQuestion.category }
        </h1>
        <h2 data-testid="question-text">
          {questionText}
        </h2>
        <div
          data-testid="answer-options"
        >
          { currentQuestion.randomizedAnswers.map((answers, index) => {
            const isCorrectAnswer = answers === currentQuestion.correct_answer;
            return (
              <button
                key={ answers }
                type="button"
                onClick={ () => this.handleClickColor(isCorrectAnswer) }
                data-testid={ isCorrectAnswer
                  ? 'correct-answer' : `wrong-answer-${index}` }
                style={ // muda a cor do botão de acordo com a resposta
                  answered // estado que muda a cor do botão
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
          answered && (
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
