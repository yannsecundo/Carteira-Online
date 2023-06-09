import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { aDeleteExpense, setIdToEdit } from '../redux/actions';

class Table extends Component {
  editExpense = (id) => {
    const { editEx } = this.props;
    editEx(id);
  };

  deleteExpense = (id) => {
    const { deleteEx } = this.props;
    deleteEx(id);
  };

  render() {
    const headerList = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            {headerList.map((column) => (
              <th key={ column }>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>
                {Math.round(
                  Number(expense.exchangeRates[expense.currency].ask) * 100,
                ) / 100}
              </td>
              <td>
                {Math.round(
                  Number(expense.value)
                    * Number(expense.exchangeRates[expense.currency].ask)
                    * 100,
                ) / 100}
              </td>
              <td>BRL</td>
              <td>
                <button
                  type="button"
                  onClick={ () => this.deleteExpense(expense.id) }
                  data-testid="delete-btn"
                >
                  Excluir
                </button>
                <button
                  type="button"
                  onClick={ () => this.editExpense(expense.id) }
                  data-testid="edit-btn"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  deleteEx: PropTypes.func.isRequired,
  editEx: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteEx: (id) => dispatch(aDeleteExpense(id)),
  editEx: (id) => dispatch(setIdToEdit(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

// stackoverflow salva vidas
// https://stackoverflow.com/questions/62336340/cannot-update-a-component-while-rendering-a-different-component-warning
// erro de renderizar table e header resolve mundando o onclicl pra uma arrow function
