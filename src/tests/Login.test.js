import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import App from '../App';

const TEST_EMAIL = 'test@test.com';
const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';

describe('Teste do componente Login', () => {
  it('Verifica se "Email" está presente na tela', () => {
    renderWithRouterAndRedux(<Login />);

    const labelEmail = screen.getByText(/email/i);
    expect(labelEmail).toBeInTheDocument();
  });

  it('Verifica se "Password" está presente na tela', () => {
    renderWithRouterAndRedux(<Login />);

    const labelPassword = screen.getByText(/password/i);
    expect(labelPassword).toBeInTheDocument();
  });

  it('Verifica se o input de email funciona corretamente', () => {
    renderWithRouterAndRedux(<Login />);

    const inputEmail = screen.getByTestId(EMAIL_INPUT);
    expect(inputEmail).toBeInTheDocument();

    userEvent.type(inputEmail, TEST_EMAIL);
    expect(inputEmail).toHaveValue(TEST_EMAIL);
  });

  it('Verifica se o input de password funciona corretamente', () => {
    renderWithRouterAndRedux(<Login />);

    const inputPassword = screen.getByTestId(PASSWORD_INPUT);
    expect(inputPassword).toBeInTheDocument();

    userEvent.type(inputPassword, '123456');
    expect(inputPassword).toHaveValue('123456');
  });

  it('Verifica se o botão está desabilitado quando o componente é renderizado', () => {
    renderWithRouterAndRedux(<Login />);

    const buttonLogin = screen.getByRole('button', { name: /entrar/i });
    expect(buttonLogin).toBeInTheDocument();
    expect(buttonLogin).toBeDisabled();
  });

  it('Verifica o funcionamento do botão', () => {
    renderWithRouterAndRedux(<Login />);

    const inputEmail = screen.getByTestId(EMAIL_INPUT);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT);

    userEvent.type(inputEmail, 'test');
    userEvent.type(inputPassword, '1234');

    const buttonLogin = screen.getByRole('button', { name: /entrar/i });
    expect(buttonLogin).toBeDisabled();

    userEvent.type(inputEmail, TEST_EMAIL);
    userEvent.type(inputPassword, '123456');
    expect(buttonLogin).not.toBeDisabled();
  });

  it('Verifica o link da página', () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se ao clicar no botão, o usuário é redirecionado para a página "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(EMAIL_INPUT);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT);

    userEvent.type(inputEmail, TEST_EMAIL);
    userEvent.type(inputPassword, '123456');

    const buttonLogin = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(buttonLogin);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
