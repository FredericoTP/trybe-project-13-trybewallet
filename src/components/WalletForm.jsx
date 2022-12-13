/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestExactCurrencie, clickEditItem } from '../redux/actions';
import '../style/WalletForm.css';

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
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick() {
    const { dispatch, expenses } = this.props;
    const { id, valueInput, method, tag, description, currency } = this.state;
    dispatch(requestExactCurrencie(
      { value: valueInput, currency, method, tag, description, id },
    ));
    this.setState(({
      id: expenses.length + 1,
      valueInput: '',
      description: '',
    }));
  }

  handleClickEdit() {
    const { dispatch } = this.props;
    const { valueInput, method, tag, description, currency } = this.state;
    dispatch(clickEditItem(
      { value: valueInput, currency, method, tag, description },
    ));
    this.setState({
      valueInput: '',
      description: '',
    });
  }

  render() {
    const { valueInput, method, tag, description, currency } = this.state;
    const { currencies, editor } = this.props;
    return (
      <div className="container-walletform">
        <form className="walletform">
          <div className="mb-3 walletform-value walletform-divs">
            <label htmlFor="valueInput" className="form-label walletform-labels">
              Valor
            </label>
            <input
              className="form-control"
              data-testid="value-input"
              id="valueInput"
              type="text"
              name="valueInput"
              value={ valueInput }
              onChange={ this.handleChange }
            />
          </div>

          <div className="mb-3 walletform-divs">
            <label htmlFor="currency" className="form-label walletform-labels">
              Moeda
            </label>
            <select
              className="form-select"
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
          </div>

          <div className="mb-3 walletform-divs">
            <label htmlFor="payment" className="form-label walletform-labels">
              Método de pagamento
            </label>
            <select
              className="form-select"
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
          </div>

          <div className="mb-3 walletform-divs">
            <label htmlFor="tag" className="form-label walletform-labels">
              Tag
            </label>
            <select
              className="form-select"
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
          </div>

          <div className="mb-3 walletform-divs">
            <label htmlFor="description" className="form-label walletform-labels">
              Descrição
            </label>
            <input
              className="form-control"
              data-testid="description-input"
              id="description"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </div>

          { !editor && (
            <button
              className="btn btn-outline-light btn-walletform"
              type="button"
              onClick={ this.handleClick }
              disabled={ !(/^[0-9]*$/).test(valueInput) || valueInput.length === 0 }
            >
              Adicionar despesa
            </button>
          )}

          { editor && (
            <button
              className="btn btn-light btn-walletform"
              type="button"
              onClick={ this.handleClickEdit }
              disabled={ !(/^[0-9]*$/).test(valueInput) || valueInput.length === 0 }
            >
              Editar despesa
            </button>
          )}
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
