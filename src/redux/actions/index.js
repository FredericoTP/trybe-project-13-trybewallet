export const ADD_EMAIL = 'ADD_EMAIL';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const REQUEST_CURRENCIES_STARTED = 'REQUEST_CURRENCIES_STARTED';
export const FAILED_REQUEST_CURRENCIES = 'FAILED_REQUEST_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_ITEM = 'DELETE_ITEM';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

const requestCurrenciesStarted = () => ({
  type: REQUEST_CURRENCIES_STARTED,
});

const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  payload: currencies,
});

const failedRequestCurrencies = (error) => ({
  type: FAILED_REQUEST_CURRENCIES,
  payload: error,
});

export function requestCurrencies() {
  return async (dispatch) => {
    dispatch(requestCurrenciesStarted());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      delete data.USDT;
      dispatch(receiveCurrencies(data));
    } catch (error) {
      dispatch(failedRequestCurrencies(error));
    }
  };
}

const addExpenses = (expenses) => {
  const { currency, exchangeRates } = expenses;
  return {
    type: ADD_EXPENSES,
    payload: expenses,
    value: expenses.value,
    exchange: exchangeRates[currency].ask,
  };
};

export function requestExactCurrencie(expenses) {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      delete data.USDT;
      dispatch(addExpenses({ ...expenses, exchangeRates: data }));
    } catch (error) {
      dispatch(failedRequestCurrencies(error));
    }
  };
}

export const deleteItem = (expenses, decrease) => ({
  type: DELETE_ITEM,
  payload: expenses,
  decrease,
});
