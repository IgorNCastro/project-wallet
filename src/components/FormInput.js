import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency } from '../actions/index';

class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.onFormChange = this.onFormChange.bind(this);
    this.onFormButtonClick = this.onFormButtonClick.bind(this);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  onFormChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async onFormButtonClick(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    await dispatch(fetchCurrency(this.state));
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    }));
  }

  render() {
    const { coinsListed } = this.props;
    const { value, description } = this.state;
    const payMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categoryForm = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            id="value"
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ this.onFormChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            id="currency"
            name="currency"
            onChange={ this.onFormChange }
          >
            { coinsListed.map((coin) => (
              <option
                key={ coin }
                value={ coin }
              >
                {coin}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            id="method"
            data-testid="method-input"
            name="method"
            onChange={ this.onFormChange }
          >
            { payMethod.map((item) => (
              <option
                key={ item }
                value={ item }
              >
                {item}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            id="tag"
            data-testid="tag-input"
            name="tag"
            onChange={ this.onFormChange }
          >
            { categoryForm.map((each) => (
              <option
                key={ each }
                value={ each }
              >
                {each}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ this.onFormChange }
          />
        </label>
        <button
          type="submit"
          name="button"
          onClick={ this.onFormButtonClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

FormInput.propTypes = {
  dispatch: PropTypes.func.isRequired,
  coinsListed: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  coinsListed: state.wallet.currencies,
  prevExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(FormInput);
