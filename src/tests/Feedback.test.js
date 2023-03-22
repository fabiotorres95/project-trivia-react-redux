import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { requestCorrectAnswer } from '../redux/actions';

describe('Testando a Tela de Feedback', () => {
  it('Testa se a página de Feedback é renderizada', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/feedback'));
    const feedback = await screen.findAllByTestId('feedback-text');
    expect(feedback.length).toBeGreaterThanOrEqual(1);

    const totalScore = await screen.findByTestId('feedback-total-score');
    expect(totalScore).toBeInTheDocument();
  });
  it('Testa se o botão "Play again" redireciona para a página inicial', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/feedback'));
    const btnPlayAgain = await screen.findByRole('button', { name: /Play again/i });
    userEvent.click(btnPlayAgain);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Testa se o botão "Ranking" redireciona para a página de ranking', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/feedback'));
    const btnRanking = await screen.findByRole('button', { name: /ranking/i });
    userEvent.click(btnRanking);
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  });
  it('Testa se o botão "Home" redireciona para a página inicial', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/feedback'));
    const btnHome = await screen.findByRole('button', { name: /home/i });
    userEvent.click(btnHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Testa se quando o jogador acerta mais de 3 questões, aparece a mensagem "Well Done!"', async () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/feedback'));

    const couldBeBetter = await screen.findByText('Could be better...');
    expect(couldBeBetter).toBeInTheDocument();

    store.dispatch(requestCorrectAnswer());
    store.dispatch(requestCorrectAnswer());
    store.dispatch(requestCorrectAnswer());

    const wellDone = await screen.findByText('Well Done!');
    expect(wellDone).toBeInTheDocument();
  });
}); 

