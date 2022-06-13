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
    const { coinsListed, isEditing, endEditClick } = this.props;
    const { value, description } = this.state;
    const payMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categoryForm = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form className="form-field">
        <div>
          <label className="" htmlFor="value"> Valor </label>
          <input
            className="user-value-input"
            id="value"
            type="number"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.onFormChange }
          />
        </div>
        <label htmlFor="currency" className=""> Moedas </label>
          <select
            className="user-input"
            id="currency"
            data-testid="currency-input"
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
        <label htmlFor="method" className=""> Método de pagamento </label>
          <select
            className="user-input"
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
        <label htmlFor="tag" className=""> Categoria </label>
          <select
            className="user-input"
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
        <div className="">
          <label className="" htmlFor="description"> Descrição </label>
          <input
            className="user-desc-input"
            id="description"
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.onFormChange }
          />
        </div>
        { !isEditing ? (
          <button
            type="submit"
            name="button"
            onClick={ this.onFormButtonClick }
            className="add-edit-button"
          >
            Adicionar despesa
          </button>
        ) : (
          <button
            type="submit"
            name="button"
            onClick={ (e) => endEditClick(e, this.state) }
            className="add-edit-button"
          >
            Editar despesa
          </button>
        )}
      </form>
    );
  }
}

FormInput.propTypes = {
  dispatch: PropTypes.func.isRequired,
  coinsListed: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  isEditing: PropTypes.bool.isRequired,
  endEditClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  coinsListed: state.wallet.currencies,
  prevExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(FormInput);
