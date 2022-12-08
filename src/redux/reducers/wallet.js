import {
  RECEIVE_CURRENCIES, REQUEST_CURRENCIES_STARTED, FAILED_REQUEST_CURRENCIES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isLoading: false,
  error: '',
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
  default:
    return state;
  }
};

export default wallet;
