// Coloque aqui suas actions

import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  GET_CURRENCY,
  UPDATE_EXPENSE,
  USER_LOGIN,

} from './namesOfActions';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  email,
});

export const getCurrency = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const currency = Object.keys(data).filter((curr) => curr !== 'USDT');
  dispatch({ type: GET_CURRENCY, currency });
};
export const addExpense = (expense) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  dispatch({ type: ADD_EXPENSE, expense, data });
};

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const updateExpense = (expenses) => ({
  type: UPDATE_EXPENSE,
  expenses,
});

export const setIdToEdit = (id) => ({
  type: ID_TO_EDIT,
  id,
});
