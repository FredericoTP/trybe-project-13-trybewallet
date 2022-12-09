import React from 'react';
import { screen } from '@testing-library/react';
import Header from '../components/Header';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Teste do componente Login Header', () => {
  it('Verifica se os elementos são exibidos na tela', () => {
    const initialState = {
      user: { email: 'test@test.com' },
      wallet: { totalValue: 10.00 },
    };

    renderWithRouterAndRedux(<Header />, { initialState });

    const email = screen.getByTestId('email-field');
    expect(email).toBeInTheDocument();
    expect(email).toHaveTextContent('test@test.com');

    const totalField = screen.getByTestId('total-field');
    expect(totalField).toBeInTheDocument();
    expect(totalField).toHaveTextContent('10.00');

    const currency = screen.getByTestId('header-currency-field');
    expect(currency).toBeInTheDocument();
    expect(currency).toHaveTextContent('BRL');
  });
});
