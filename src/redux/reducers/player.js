import { CORRECT_ANSWER, NEXT_QUESTION, PLAY_AGAIN, USER_PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_PLAYER: {
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  }
  case NEXT_QUESTION: {
    return {
      ...state,
      score: state.score + action.score,
    };
  }
  case CORRECT_ANSWER: {
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  }
  case PLAY_AGAIN: {
    return {
      ...state,
      assertions: 0,
      score: 0,
    };
  }
  default: return state;
  }
};

export default player;
