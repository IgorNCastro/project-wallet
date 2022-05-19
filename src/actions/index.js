export const USER_ACTION = 'USER_ACTION';
export const WALLET_ACTION = 'WALLET_ACTION';
export const FORM_ACTION = 'FORM_ACTION';
export const DELETE_ACTION = 'DELETE_ACTION';

export const updateEmail = (state) => ({
  type: USER_ACTION,
  email: state,
});

export const updateWallet = (state) => ({
  type: WALLET_ACTION,
  payload: [...state],
});

export const updateExpenses = (state, exchange) => ({
  type: FORM_ACTION,
  payload: {
    ...state,
    exchangeRates: exchange,
  },
});

export const updateExpensesAfterDelete = (state) => ({
  type: DELETE_ACTION,
  payload: state,
});

// Código extraido de https://masteringjs.io/tutorials/fundamentals/filter-key#:~:text=JavaScript%20objects%20don't%20have,()%20function%20as%20shown%20below.
export function fetchCoins() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((result) => dispatch(updateWallet(Object.keys(result)
      .filter((key) => !key.includes('USDT')))));
}

export function fetchCurrency(state) {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const exchange = await response.json();
      dispatch(updateExpenses(state, exchange));
    } catch (e) {
      console.log(e);
    }
  };
}
