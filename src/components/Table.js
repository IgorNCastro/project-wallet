import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  adjustCurrencyName = (name) => {
    const newName = name.split('/');
    const fixedName = newName[0];
    return fixedName;
  }

  adjustValue = (value) => {
    const fixedValue = parseFloat(value).toFixed(2);
    return fixedValue;
  }

  adjustCurrency = (value) => {
    const fixedCurr = Math.round((value) * 100) / 100;
    return fixedCurr;
  }

  adjustExpenseTotal = (value, currency) => {
    const fixedExpenseTotal = Math.round((value * currency) * 100) / 100;
    return fixedExpenseTotal;
  }

  render() {
    const { prevExpenses } = this.props;
    return (
      <section>
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
            {prevExpenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ this.adjustValue(expense.value) }</td>
                <td>
                  { this.adjustCurrencyName(
                    expense.exchangeRates[expense.currency].name,
                  ) }
                </td>
                <td>
                  { this.adjustCurrency(
                    expense.exchangeRates[expense.currency].ask,
                  ) }
                </td>
                <td>
                  { this.adjustExpenseTotal(
                    expense.value, expense.exchangeRates[expense.currency].ask,
                  ) }
                </td>
                <td>Real</td>
                <td>Editar/Excluir</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

Table.propTypes = {
  prevExpenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  prevExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
