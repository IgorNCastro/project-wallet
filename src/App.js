import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import NotFound from './pages/NotFound';
import { updateEmail } from './actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.loginReady = this.loginReady.bind(this);
    this.state = {
      emailInput: '',
      passwordInput: '',
      isLoginDisabled: true,
    };
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value, isLoginDisabled: true }, () => {
      this.loginReady();
    });
  }

  // Código extraido de https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript/48800#48800
  validateEmail(email) {
    const result = /^[^\s@]+@[^\s@]+\.com/;
    return result.test(email);
  }

  loginReady() {
    const { emailInput, passwordInput } = this.state;
    const MIN_LENGTH = 6;
    if (this.validateEmail(emailInput) && passwordInput.length >= MIN_LENGTH) {
      this.setState({ isLoginDisabled: false });
    }
  }

  render() {
    const {
      emailInput,
      passwordInput,
      isLoginDisabled,
    } = this.state;
    const { DispUpdateEmail } = this.props;

    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ (props) => (<Login
            { ... props }
            emailInput={ emailInput }
            passwordInput={ passwordInput }
            isLoginDisabled={ isLoginDisabled }
            onInputChange={ this.onInputChange }
            DispUpdateEmail={ DispUpdateEmail }
          />) }
        />
        <Route exact path="/carteira" component={ Wallet } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

App.propTypes = {
  DispUpdateEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  DispUpdateEmail: (state) => dispatch(updateEmail(state)),
});

export default connect(null, mapDispatchToProps)(App);
