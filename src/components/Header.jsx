import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/Header.css';
import image from '../images/wallet.png';

class Header extends Component {
  render() {
    const { email, totalValue } = this.props;
    return (
      <div className="container-header">
        <div className="container-image">
          <img className="image-header" src={ image } alt="Trybe Wallet" />
        </div>
        <div className="container-header-content">
          <h3 data-testid="email-field">{ email }</h3>
          <h3>
            Despesa Total:
            {' '}
            R$
            {' '}
            <span data-testid="total-field">{ totalValue.toFixed(2) }</span>
          </h3>
          <h3 data-testid="header-currency-field">BRL</h3>

        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalValue: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
  totalValue: state.wallet.totalValue,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
