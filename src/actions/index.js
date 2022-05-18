export const USER_ACTION = 'USER_ACTION';
export const WALLET_ACTION = 'WALLET_ACTION';

export const updateEmail = (state) => ({
  type: USER_ACTION,
  email: state,
});

export const updateWallet = (state) => ({
  type: WALLET_ACTION,
  ...state,
});
