const getToken = async () => {
  const triviaURL = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = await triviaURL.json();
  localStorage.setItem('token', response.token);
  return response;
};

export const getQuestions = async () => {
  const tokenTrivia = localStorage.getItem('token');
  const trivaQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenTrivia}`);
  const response = await trivaQuestions.json();
  return response;
};

export default getToken;
