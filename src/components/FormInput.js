import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.onFormChange = this.onFormChange.bind(this);
    this.state = {
      spendValue: '',
      description: '',
    };
  }

  onFormChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { coinsListed } = this.props;
    const { spendValue, description } = this.state;
    const payMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categoryForm = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        <label htmlFor="spendValue">
          Valor:
          <input
            id="spendValue"
            data-testid="value-input"
            type="number"
            name="spendValue"
            value={ spendValue }
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
        <label htmlFor="category">
          Categoria:
          <select
            id="category"
            data-testid="tag-input"
            name="category"
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
      </form>
    );
  }
}

FormInput.propTypes = {
  coinsListed: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  coinsListed: state.wallet.currencies,
});

export default connect(mapStateToProps)(FormInput);
