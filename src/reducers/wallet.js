import { WALLET_ACTION, FORM_ACTION, DELETE_ACTION } from '../actions/index';

export const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
};

export const wallet = (state = INITIAL_STATE_WALLET, action) => {
  switch (action.type) {
  case WALLET_ACTION:
    return {
      ...state,
      currencies: [...action.payload],
    };
  case FORM_ACTION:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_ACTION:
    return {
      ...state,
      expenses: action.payload,
    };
  default:
    return state;
  }
};
