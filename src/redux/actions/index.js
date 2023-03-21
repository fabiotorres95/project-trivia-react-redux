export const USER_PLAYER = 'USER_PLAYER';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const CORRECT_ANSWER = 'CORRECT_ANSWER';

export const requestUserPlayer = (name, email) => ({
  type: USER_PLAYER,
  name,
  email,
});

export const requestNextQuestion = (timer, difficulty) => {
  const initialPoints = 10;
  const totalScore = initialPoints + (timer * difficulty);
  return {
    type: NEXT_QUESTION,
    score: totalScore,
  };
};

export const requestCorrectAnswer = () => ({
  type: CORRECT_ANSWER,
});
