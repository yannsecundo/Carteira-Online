import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  aAddExpense,
  aGetCurrency,
  aUpdateExpense,
} from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.initialState = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    const { getCurrency } = this.props;
    getCurrency();
  }

  handleClick = () => {
    const { addExpense } = this.props;
    addExpense(this.state);
    this.setState(this.initialState);
  };

  editClick = () => {
    const { expenses, idToEdit, updateExpenses } = this.props;
    const indexEdit = expenses.map((expense) => expense.id).indexOf(idToEdit);
    expenses[indexEdit] = {
      id: expenses[indexEdit].id,
      ...this.state,
      exchangeRates: expenses[indexEdit].exchangeRates,
    };
    updateExpenses(expenses);
  };

  inputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    const methodPayment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagList = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        <label htmlFor="value">
          Valor
          <input
            type="number"
            id="value"
            name="value"
            value={ value }
            onChange={ this.inputChange }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="value">
          Descrição
          <input
            type="text"
            id="description"
            name="description"
            value={ description }
            onChange={ this.inputChange }
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.inputChange }
            data-testid="currency-input"
          >
            {currencies.map((curr) => (
              <option value={ curr } key={ curr }>
                {curr}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select
            name="method"
            id="method"
            value={ method }
            onChange={ this.inputChange }
            data-testid="method-input"
          >
            {methodPayment.map((methods) => (
              <option value={ methods } key={ methods }>
                {methods}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.inputChange }
            data-testid="tag-input"
          >
            {tagList.map((tags) => (
              <option value={ tags } key={ tags }>
                {tags}
              </option>
            ))}
          </select>
        </label>
        {editor ? (
          <button
            type="button"
            onClick={ this.editClick }
          >
            Editar despesa
          </button>
        ) : (
          <button type="button" onClick={ this.handleClick }>
            Adicionar despesa
          </button>
        )}
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  editor: PropTypes.bool.isRequired,
  getCurrency: PropTypes.func.isRequired,
  updateExpenses: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  idToEdit: PropTypes.number,
  expenses: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

WalletForm.defaultProps = {
  idToEdit: null,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(aGetCurrency()),
  addExpense: (expense) => dispatch(aAddExpense(expense)),
  updateExpenses: (expenses) => dispatch(aUpdateExpense(expenses)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
