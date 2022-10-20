import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import Wallet from '../../pages/Wallet';

describe('Tela da carteira', () => {
  it(('testando se os campos obrigatórios estão presente'), () => {
    renderWithRouterAndRedux(<Wallet />);
    const emailUser = screen.getByTestId('email-field');
    const totalExpenses = screen.getByTestId('total-field');
    const headerCurrency = screen.getByTestId('header-currency-field');
    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const currencyOption = screen.getByTestId('currency-input');
    const methodPayment = screen.getByTestId('method-input');
    const tagOptions = screen.getByTestId('tag-input');
    expect(emailUser).toBeInTheDocument();
    expect(totalExpenses).toBeInTheDocument();
    expect(headerCurrency).toBeInTheDocument();
    expect(inputValue).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(currencyOption).toBeInTheDocument();
    expect(methodPayment).toBeInTheDocument();
    expect(tagOptions).toBeInTheDocument();
  });
  it(('testando os buttons da carteira'), () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    userEvent.type((inputValue), '12');
    userEvent.type((inputDescription), 'coca');
    const addButton = screen.getByRole('button', { name: 'Adicionar despesa' });
    userEvent.click(addButton);
    expect(addButton).toBeInTheDocument();
  });
});
