import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

const VALUE_INPUT = 'value-input';
const CURRENCY_INPUT = 'currency-input';
const METHOD_INPUT = 'method-input';
const TAG_INPUT = 'tag-input';
const DESCRIPTION_INPUT = 'description-input';

describe('Teste da página Wallet', () => {
  afterEach(() => jest.clearAllMocks());

  it('Verifica se os inputse o botão são rendericados corretamente', () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId(VALUE_INPUT);
    const inputCurrency = screen.getByTestId(CURRENCY_INPUT);
    const inputMethod = screen.getByTestId(METHOD_INPUT);
    const inputTag = screen.getByTestId(TAG_INPUT);
    const inputDescription = screen.getByTestId(DESCRIPTION_INPUT);
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

    const inputValue = screen.getByTestId(VALUE_INPUT);
    const inputMethod = screen.getByTestId(METHOD_INPUT);
    const inputTag = screen.getByTestId(TAG_INPUT);
    const inputDescription = screen.getByTestId(DESCRIPTION_INPUT);

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
    const tableValueConvert = await screen.findByRole('cell', { name: /99\.82/i });

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

  it('Verifica se é possível editar um item da tabela', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId(VALUE_INPUT);
    const inputMethod = screen.getByTestId(METHOD_INPUT);
    const inputTag = screen.getByTestId(TAG_INPUT);
    const inputDescription = screen.getByTestId(DESCRIPTION_INPUT);

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
    const tableValueConvert = await screen.findByRole('cell', { name: /99\.82/i });
    const totalField = await screen.findByTestId('total-field');

    expect(tableDescription).toBeInTheDocument();
    expect(tableTag).toBeInTheDocument();
    expect(tableMethod).toBeInTheDocument();
    expect(tableValue).toBeInTheDocument();
    expect(tableValueConvert).toBeInTheDocument();
    expect(totalField).toBeInTheDocument();
    expect(totalField).toHaveTextContent('99.82');

    userEvent.selectOptions(inputMethod, ['Dinheiro']);
    userEvent.selectOptions(inputTag, ['Saúde']);
    userEvent.type(inputValue, '15');
    userEvent.type(inputDescription, 'Remédio');
    userEvent.click(buttonAdd);

    const totalField2 = await screen.findByText('171.12');
    expect(totalField2).toBeInTheDocument();

    const buttonEdit = await screen.findAllByRole('button', { name: /editar/i });
    userEvent.click(buttonEdit[0]);
    userEvent.selectOptions(inputMethod, ['Cartão de crédito']);
    userEvent.selectOptions(inputTag, ['Alimentação']);
    userEvent.type(inputValue, '20');
    userEvent.type(inputDescription, 'Comida');

    const editDespesa = screen.getByRole('button', { name: /editar despesa/i });
    userEvent.click(editDespesa);

    expect(tableDescription).toHaveTextContent('Comida');
    expect(tableTag).toHaveTextContent('Alimentação');
    expect(tableMethod).toHaveTextContent('Cartão de crédito');
    expect(tableValue).toHaveTextContent('20.00');
    expect(tableValueConvert).toHaveTextContent('95.06');

    const totalField3 = await screen.findByText('166.36');
    expect(totalField3).toBeInTheDocument();
  });
});
