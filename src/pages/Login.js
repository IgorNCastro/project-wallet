import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(e) {
    e.preventDefault();
    const { history, DispUpdateEmail, emailInput } = this.props;
    DispUpdateEmail(emailInput);
    history.push('/carteira');
  }

  render() {
    const {
      emailInput,
      passwordInput,
      isLoginDisabled,
      onInputChange,
    } = this.props;

    return (
      <div className="login-section">
        <section className="login-input">
          <h2>
            Welcome to Wallet
          </h2>
          <input
            data-testid="email-input"
            type="email"
            name="emailInput"
            placeholder="Email"
            value={ emailInput }
            onChange={ onInputChange }
            className="input-login-box"
          />
          <input
            data-testid="password-input"
            type="password"
            name="passwordInput"
            placeholder="Password"
            value={ passwordInput }
            onChange={ onInputChange }
            className="input-login-box"
          />
          <button
            type="submit"
            name="button"
            disabled={ isLoginDisabled }
            onClick={ this.onButtonClick }
            className="login-button"
          >
            Entrar
          </button>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  emailInput: PropTypes.string.isRequired,
  passwordInput: PropTypes.string.isRequired,
  isLoginDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  DispUpdateEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
