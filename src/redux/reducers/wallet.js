import {
  RECEIVE_CURRENCIES,
  REQUEST_CURRENCIES_STARTED,
  FAILED_REQUEST_CURRENCIES,
  ADD_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isLoading: false,
  error: '',
  totalValue: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES_STARTED:
    return {
      ...state,
      isLoading: true,
    };
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.payload),
      isLoading: false,
    };
  case FAILED_REQUEST_CURRENCIES:
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      totalValue: +(
        state.totalValue + (+action.value * +action.exchange)
      ).toFixed(2),
    };
  default:
    return state;
  }
};

export default wallet;
