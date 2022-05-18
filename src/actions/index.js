export const USER_ACTION = 'USER_ACTION';
export const WALLET_ACTION = 'WALLET_ACTION';

export const updateEmail = (state) => ({
  type: USER_ACTION,
  email: state,
});

export const updateWallet = (state) => ({
  type: WALLET_ACTION,
  currencies: state,
  expenses: [],
});

// Código extraido de https://masteringjs.io/tutorials/fundamentals/filter-key#:~:text=JavaScript%20objects%20don't%20have,()%20function%20as%20shown%20below.
export function fetchCoins() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((result) => dispatch(updateWallet(Object.keys(result)
      .filter((key) => !key.includes('USDT')))));
}
