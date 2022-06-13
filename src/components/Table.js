import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateExpensesAfterDelete } from '../actions/index';
import '../index.css';

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
    const fixedCurr = (Math.round((value) * 100) / 100).toFixed(2);
    return fixedCurr;
  }

  adjustExpenseTotal = (value, currency) => {
    const fixedExpenseTotal = Math.round((value * currency) * 100) / 100;
    return fixedExpenseTotal;
  }

  onDeleteButtonClick = async (e) => {
    e.preventDefault();
    const {
      prevExpenses,
      disUpdateExpensesAfterDelete,
    } = this.props;
    const updatedList = prevExpenses
      .filter((expense) => expense.id !== Number(e.target.name));
    await disUpdateExpensesAfterDelete(updatedList);
  }

  render() {
    const {
      prevExpenses,
      onEditButtonClick,
      isEditing,
    } = this.props;

    return (
      <section className="">
        <table className="table-wallet">
          <thead className="">
            <tr className="table-row">
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
              <tr key={ expense.id } className="table-row">
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
                <td>
                  { !isEditing ? (
                    <button
                      data-testid="edit-btn"
                      type="submit"
                      name={ expense.id }
                      onClick={ onEditButtonClick }
                      className="button-edit"
                    >
                      Editar despesa
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    data-testid="delete-btn"
                    type="submit"
                    name={ expense.id }
                    onClick={ this.onDeleteButtonClick }
                    className="button-delete"
                  >
                    Excluir
                  </button>
                </td>
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
  disUpdateExpensesAfterDelete: PropTypes.func.isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  prevExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  disUpdateExpensesAfterDelete: (state) => dispatch(updateExpensesAfterDelete(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
