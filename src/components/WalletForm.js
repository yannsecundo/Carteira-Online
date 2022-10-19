import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      expensestag: 'Alimentação',
    };
  }

  render() {
    const { value, description, currency, method, expensestag } = this.state;
    const { currencies } = this.props;
    const methodPayment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const expensesList = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        <label htmlFor="value">
          Valor
          <input
            type="number"
            id="value"
            name="value"
            value={ value }
            onChange={ () => {} }
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
            onChange={ () => {} }
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            id="currency"
            value={ currency }
            onChange={ () => {} }
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
            onChange={ () => {} }
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
            value={ expensestag }
            onChange={ () => {} }
            data-testid="tag-input"
          >
            {expensesList.map((tags) => (
              <option value={ tags } key={ tags }>
                {tags}
              </option>
            ))}
          </select>
        </label>
        {editor ? (
          <button
            type="button"
            onClick={ () => {} }
          >
            Editar despesa
          </button>
        ) : (
          <button type="button" onClick={ () => {} }>
            Adicionar despesa
          </button>
        )}
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(actionGetCurrency()),
  addExpense: (expense) => dispatch(actionAddExpense(expense)),
  updateExpenses: (expenses) => dispatch(actionUpdateExpense(expenses)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
