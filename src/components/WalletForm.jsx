import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestExactCurrencie } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      valueInput: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      currency: 'USD',
      id: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick() {
    const { dispatch } = this.props;
    const { id, valueInput, method, tag, description, currency } = this.state;
    dispatch(requestExactCurrencie(
      { value: valueInput, currency, method, tag, description, id },
    ));
    this.setState((prevState) => ({
      id: prevState.id + 1,
      valueInput: '',
      description: '',
    }));
  }

  render() {
    const { valueInput, method, tag, description, currency } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="valueInput">
          Valor
          <input
            data-testid="value-input"
            id="valueInput"
            type="text"
            name="valueInput"
            value={ valueInput }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency">
          Moeda
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((item) => (
              <option key={ item } value={ item }>{item}</option>
            ))}
          </select>
        </label>

        <label htmlFor="payment">
          Método de pagamento
          <select
            data-testid="method-input"
            name="method"
            id="payment"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Tag
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <label htmlFor="description">
          Descrição
          <input
            data-testid="description-input"
            id="description"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
