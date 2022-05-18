import { WALLET_ACTION } from '../actions/index';

export const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
};

export const wallet = (state = INITIAL_STATE_WALLET, action) => {
  switch (action.type) {
  case WALLET_ACTION:
    return {
      ...state,
      currencies: action.currencies,
      expenses: action.expenses,
    };
  default:
    return state;
  }
};
