// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  GET_CURRENCY,
  UPDATE_EXPENSE,
} from '../actions/namesOfActions';

const INITIAL_STATE = {
  currencies: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCY:
    return { ...state, currencies: action.currency };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.numberExpenses,
          ...action.expense,
          exchangeRates: action.data,
        },
      ],
      numberExpenses: state.numberExpenses + 1,
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses].filter(
        (expense) => expense.id !== action.id,
      ),
    };

  case UPDATE_EXPENSE:
    return {
      ...state,
      expenses: [...action.expenses],
      editor: false,
      idToEdit: null,
    };
  default:
    return state;
  }
};

export default reducer;
