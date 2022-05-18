import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { emailUser } = this.props;
    return (
      <header>
        <h2>TrybeWallet</h2>
        <h4 data-testid="email-field">{ emailUser }</h4>
        <h4 data-testid="header-currency-field">BRL</h4>
        <h4 data-testid="total-field">0</h4>
      </header>
    );
  }
}

Wallet.propTypes = {
  emailUser: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
