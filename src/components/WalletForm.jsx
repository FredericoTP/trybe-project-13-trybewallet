import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      valueInput: '',
      payment: 'money',
      tag: 'food',
      description: '',
      currency: 'USD',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { valueInput, payment, tag, description, currency } = this.state;
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
            name="payment"
            id="payment"
            value={ payment }
            onChange={ this.handleChange }
          >
            <option value="money">Dinheiro</option>
            <option value="creditcard">Cartão de crédito</option>
            <option value="debitcard">Cartão de débito</option>
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
            <option value="food">Alimentação</option>
            <option value="leisure">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
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
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
