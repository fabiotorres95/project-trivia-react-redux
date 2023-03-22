import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';

describe('Testando a Tela de Feedback', () => {
  it('Testa se a página de Feedback é renderizada', () => {
    renderWithRouterAndRedux(<Feedback />);
    const feedback = screen.getByTestId('feedback-text');
    expect(feedback).toBeInTheDocument();
  });
  it('Testa se o botão "Jogar novamente" redireciona para a página de jogo', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const btnPlayAgain = screen.getByRole('button', { name: /Play again/i });
    userEvent.click(btnPlayAgain);
    const { pathname } = history.location;
    expect(pathname).toBe('/game');
  });
  it('Testa se o botão "Ranking" redireciona para a página de ranking', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const btnRanking = screen.getByRole('button', { name: /ranking/i });
    userEvent.click(btnRanking);
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  });
  it('Testa se o botão "Home" redireciona para a página inicial', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const btnHome = screen.getByRole('button', { name: /home/i });
    userEvent.click(btnHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});