export const USER_ACTION = 'USER_ACTION';
export const WALLET_ACTION = 'WALLET_ACTION';

export const updatePersonal = (state) => ({
  type: USER_ACTION,
  ...state,
});

export const updateProfessional = (state) => ({
  type: WALLET_ACTION,
  ...state,
});
