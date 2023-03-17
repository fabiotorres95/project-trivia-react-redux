const getToken = async () => {
  const triviaURL = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = await triviaURL.json();
  localStorage.setItem('token', response.token);
  return response;
};

export default getToken;
