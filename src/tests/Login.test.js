import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';
import App from '../App';


describe('Testando a Tela de Login', () => {
    it('Testa se os Inputs de Nome e Email estão renderizados na tela', () => {
        renderWithRouterAndRedux(<Login />);
      const name = screen.getByTestId('input-player-name');
      const email = screen.getByTestId('input-gravatar-email');
    
      expect(name).toBeInTheDocument();
      expect(email).toBeInTheDocument();
      
    });
    it('Testa se os Inputs estão funcionando', () => {
        renderWithRouterAndRedux(<Login />);
      const name = screen.getByTestId('input-player-name');
      const email = screen.getByTestId('input-gravatar-email');
      userEvent.type(name, 'tryber')
      userEvent.type(email, 'email@mail.com')

  
      expect(name.value).toBe('tryber');
      expect(email.value).toBe('email@mail.com');
    });
    it('Testa se ao clicar no Botão Configurações, a aplicação redireciona para a página de Configurações', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const btnConfig = screen.getByRole('button', { name: /configurações/i });

        userEvent.click(btnConfig);

        const { pathname } = history.location;
        expect(pathname).toBe('/config');
    });
    it('Testa se ao clicar no Botão Play, a aplicação redireciona para a página do jogo', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const name = screen.getByTestId('input-player-name');
        const email = screen.getByTestId('input-gravatar-email');

        userEvent.type(name, 'tryber')
        userEvent.type(email, 'email@mail.com')

        const btnPlay = screen.getByRole('button', { name: /play/i });

        userEvent.click(btnPlay);
        
        const { pathname } = history.location;
        expect(pathname).toBe('/game');
    });
});
