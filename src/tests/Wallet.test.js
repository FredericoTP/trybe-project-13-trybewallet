import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

describe('Teste da página Wallet', () => {
  afterEach(() => jest.clearAllMocks());

  it('Verifica se os inputse o botão são rendericados corretamente', () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId('value-input');
    const inputCurrency = screen.getByTestId('currency-input');
    const inputMethod = screen.getByTestId('method-input');
    const inputTag = screen.getByTestId('tag-input');
    const inputDescription = screen.getByTestId('description-input');
    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(inputValue).toBeInTheDocument();
    expect(inputCurrency).toBeInTheDocument();
    expect(inputMethod).toBeInTheDocument();
    expect(inputTag).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(buttonAdd).toBeInTheDocument();
  });

  it('Verifica se o fetch é feito', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<Wallet />);

    const inputCurrency = await screen.findByRole('option', { name: 'USD' });
    expect(inputCurrency).toBeInTheDocument();
  });

  it('Verifica se é possível adicionar uma despesa e excluir', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId('value-input');
    const inputMethod = screen.getByTestId('method-input');
    const inputTag = screen.getByTestId('tag-input');
    const inputDescription = screen.getByTestId('description-input');

    userEvent.selectOptions(inputMethod, ['Cartão de débito']);
    userEvent.selectOptions(inputTag, ['Lazer']);
    userEvent.type(inputValue, '21');
    userEvent.type(inputDescription, 'Lanche');

    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(buttonAdd);

    const tableDescription = await screen.findByRole('cell', { name: /lanche/i });
    const tableTag = await screen.findByRole('cell', { name: /lazer/i });
    const tableMethod = await screen.findByRole('cell', { name: /cartão de débito/i });
    const tableValue = await screen.findByRole('cell', { name: '21.00' });
    const tableCurrency = await screen.findByRole('cell', { name: /dólar americano\/real brasileiro/i });
    const tableCambio = await screen.findByRole('cell', { name: /4\.75/i });
    const tableValueConvert = await await screen.findByRole('cell', { name: /99\.82/i });

    expect(tableDescription).toBeInTheDocument();
    expect(tableTag).toBeInTheDocument();
    expect(tableMethod).toBeInTheDocument();
    expect(tableCurrency).toBeInTheDocument();
    expect(tableValue).toBeInTheDocument();
    expect(tableCambio).toBeInTheDocument();
    expect(tableValueConvert).toBeInTheDocument();

    const deleteBtn = screen.getByRole('button', { name: /excluir/i });
    userEvent.click(deleteBtn);
    expect(tableDescription).not.toBeInTheDocument();
    expect(tableTag).not.toBeInTheDocument();
    expect(tableMethod).not.toBeInTheDocument();
    expect(tableCurrency).not.toBeInTheDocument();
    expect(tableValue).not.toBeInTheDocument();
    expect(tableCambio).not.toBeInTheDocument();
    expect(tableValueConvert).not.toBeInTheDocument();
  });
});
