import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteItem } from '../redux/actions';

class Table extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    const { dispatch, expenses } = this.props;
    const array = expenses;
    let decrease = 0;
    expenses.forEach((item, index) => {
      const { value, currency, exchangeRates } = item;
      if (item.id === id) {
        array.splice(index, 1);
        const exchangeValue = +exchangeRates[currency].ask;
        decrease = (+value * exchangeValue);
      }
    });
    dispatch(deleteItem(array, decrease));
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((item) => {
              const {
                description, tag, method, value, id, currency, exchangeRates,
              } = item;
              const exchangeValue = +exchangeRates[currency].ask;
              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ (+value).toFixed(2) }</td>
                  <td>{ exchangeRates[currency].name }</td>
                  <td>{ exchangeValue.toFixed(2) }</td>
                  <td>{ (+value * exchangeValue).toFixed(2) }</td>
                  <td>Real</td>
                  <td>
                    <div>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => this.handleClick(id) }
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      currency: PropTypes.string,
    }),
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
