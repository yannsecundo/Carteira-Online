import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

describe('Tela de Login', () => {
  it(('testando se existe os campos necessários na tela de login'), () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button', { name: 'Entrar' });
    expect(inputName).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
  it(('testando a validação do email e senha'), () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('email-input');
    userEvent.type((inputName), 'test@test.com');
    const inputPassword = screen.getByTestId('password-input');
    userEvent.type((inputPassword), '1234567');
    const loginButton = screen.getByRole('button', { name: 'Entrar' });
    userEvent.click(loginButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
