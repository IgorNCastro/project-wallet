import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormInput from '../components/FormInput';
import Table from '../components/Table';
import { fetchCoins, updateExpensesAfterDelete } from '../actions/index';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.updateTotalField = this.updateTotalField.bind(this);
    this.onEditButtonClick = this.onEditButtonClick.bind(this);
    this.endEditClick = this.endEditClick.bind(this);
    this.state = {
      atualCurrency: 'BRL',
      isEditing: false,
      whoIsEditing: null,
      timesUpdated: false,
    };
  }

  componentDidMount() {
    const { disFetchCoins } = this.props;
    disFetchCoins();
  }

  onEditButtonClick(e) {
    e.preventDefault();
    const { target: { name } } = e;
    this.setState({
      isEditing: true,
      whoIsEditing: Number(name),
      timesUpdated: false,
    });
  }

  endEditClick(e, input) {
    e.preventDefault();
    const { prevExpenses, disUpdateExpensesAfterDelete } = this.props;
    const { whoIsEditing } = this.state;
    prevExpenses[whoIsEditing].value = input.value;
    prevExpenses[whoIsEditing].currency = input.currency;
    prevExpenses[whoIsEditing].method = input.method;
    prevExpenses[whoIsEditing].tag = input.tag;
    prevExpenses[whoIsEditing].description = input.description;
    this.setState({
      isEditing: false,
      whoIsEditing: null,
      timesUpdated: true,
    });
    disUpdateExpensesAfterDelete(prevExpenses);
  }

  updateTotalField() {
    const { prevExpenses } = this.props;
    const valueAdded = prevExpenses
      .reduce((acc, cur) => acc + (cur.value * cur.exchangeRates[cur.currency].ask), 0);
    return Math.floor((valueAdded * 100)) / 100;
  }

  render() {
    const { emailUser } = this.props;
    const { atualCurrency, isEditing, whoIsEditing, timesUpdated } = this.state;
    return (
      <main>
        <header>
          <h2>TrybeWallet</h2>
          <h4 data-testid="email-field">{ emailUser }</h4>
          <h4 data-testid="header-currency-field">{ atualCurrency }</h4>
          <h4 data-testid="total-field">{ this.updateTotalField() }</h4>
        </header>
        <FormInput
          isEditing={ isEditing }
          whoIsEditing={ whoIsEditing }
          endEditClick={ this.endEditClick }
        />
        <Table
          isEditing={ isEditing }
          timesUpdated={ timesUpdated }
          onEditButtonClick={ this.onEditButtonClick }
        />
      </main>
    );
  }
}

Wallet.propTypes = {
  emailUser: PropTypes.string.isRequired,
  disFetchCoins: PropTypes.func.isRequired,
  disUpdateExpensesAfterDelete: PropTypes.func.isRequired,
  prevExpenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  prevExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  disUpdateExpensesAfterDelete: (state) => dispatch(updateExpensesAfterDelete(state)),
  disFetchCoins: () => dispatch(fetchCoins()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
