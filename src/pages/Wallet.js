import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoins } from '../actions/index';
import FormInput from '../components/FormInput';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.updateTotalField = this.updateTotalField.bind(this);
    this.state = {
      atualCurrency: 'BRL',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoins());
  }

  updateTotalField() {
    const { prevExpenses } = this.props;
    const valueAdded = prevExpenses
      .reduce((acc, cur) => acc + (cur.value * cur.exchangeRates[cur.currency].ask), 0);
    return Math.floor(valueAdded * 100) / 100;
  }

  render() {
    const { emailUser } = this.props;
    const { atualCurrency } = this.state;
    return (
      <main>
        <header>
          <h2>TrybeWallet</h2>
          <h4 data-testid="email-field">{ emailUser }</h4>
          <h4 data-testid="header-currency-field">{ atualCurrency }</h4>
          <h4 data-testid="total-field">{ this.updateTotalField() }</h4>
        </header>
        <FormInput />
        <Table />
      </main>
    );
  }
}

Wallet.propTypes = {
  emailUser: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  prevExpenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  prevExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
