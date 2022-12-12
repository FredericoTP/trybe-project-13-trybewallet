/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';
import '../style/Login.css';

const NUMBER_SIX = 6;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.buttonValidation = this.buttonValidation.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick() {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(addEmail(email));
    history.push('/carteira');
  }

  buttonValidation() {
    const { email, password } = this.state;
    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const bool = !(validEmail.test(email) && password.length >= NUMBER_SIX);
    return bool;
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="container-page-login">
        <div className="container-login">
          <div className="mb-3">
            <label htmlFor="input-email" className="form-label label-login">
              Email
            </label>
            <input
              className="form-control"
              data-testid="email-input"
              id="input-email"
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              placeholder="name@exemplo.com"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="input-password" className="form-label label-login">
              Password
            </label>
            <input
              className="form-control"
              data-testid="password-input"
              id="input-password"
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
              placeholder="Min. 6 caracteres"
            />
          </div>
          <button
            className="btn btn-outline-dark btn-login"
            type="button"
            onClick={ this.handleClick }
            disabled={ this.buttonValidation() }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
