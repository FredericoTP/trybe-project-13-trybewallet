import {
  RECEIVE_CURRENCIES,
  REQUEST_CURRENCIES_STARTED,
  FAILED_REQUEST_CURRENCIES,
  ADD_EXPENSES,
  DELETE_ITEM,
  EDIT_ITEM,
  CLICK_EDIT_ITEM,
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

const changeTotalPrice = (state, payload) => {
  let total = 0;
  const { value: valueP, currency: currencyP } = payload;
  state.expenses.forEach((item) => {
    const { value, currency, exchangeRates, id } = item;
    const exchangeValue = +exchangeRates[currency].ask;
    const exchangeValueP = +exchangeRates[currencyP].ask;
    if (id === state.idToEdit) {
      total += (+(valueP) * exchangeValueP);
      console.log(item);
    } else {
      total += (+(value) * exchangeValue);
    }
  });
  return total;
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES_STARTED:
    return { ...state,
      isLoading: true };
  case RECEIVE_CURRENCIES:
    return { ...state,
      currencies: Object.keys(action.payload),
      isLoading: false };
  case FAILED_REQUEST_CURRENCIES:
    return { ...state,
      isLoading: false,
      error: action.payload };
  case ADD_EXPENSES:
    return { ...state,
      expenses: [...state.expenses, action.payload],
      totalValue: +(
        state.totalValue + (+action.value * +action.exchange)
      ).toFixed(2) };
  case DELETE_ITEM:
    return { ...state,
      expenses: [...action.payload],
      totalValue: +(state.totalValue - action.decrease).toFixed(2) };
  case EDIT_ITEM:
    return { ...state, editor: true, idToEdit: action.payload };
  case CLICK_EDIT_ITEM:
    console.log(action.payload);
    return {
      ...state,
      expenses: state.expenses.map((item) => {
        if (item.id === state.idToEdit) {
          return { ...item, ...action.payload };
        }
        return item;
      }),
      editor: false,
      totalValue: changeTotalPrice(state, action.payload),
    };
  default:
    return state;
  }
};

export default wallet;
