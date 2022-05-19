import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoins } from '../actions/index';
import FormInput from '../components/FormInput';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.updateTotalField = this.updateTotalField.bind(this);
    this.state = {
      totalField: 0,
      atualCurrency: 'BRL',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoins());
  }

  updateTotalField(value) {
    const { totalField } = this.state;
    const finalValue = Math.floor((totalField + value) * 100) / 100;
    this.setState({ totalField: finalValue });
  }

  render() {
    const { emailUser } = this.props;
    const { totalField, atualCurrency } = this.state;
    return (
      <main>
        <header>
          <h2>TrybeWallet</h2>
          <h4 data-testid="email-field">{ emailUser }</h4>
          <h4 data-testid="header-currency-field">{ atualCurrency }</h4>
          <h4 data-testid="total-field">{ totalField }</h4>
        </header>
        <FormInput updateTotalField={ this.updateTotalField } />
      </main>
    );
  }
}

Wallet.propTypes = {
  emailUser: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
