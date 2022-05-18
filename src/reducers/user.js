import { USER_ACTION } from '../actions/index';

export const INITIAL_STATE_USER = {
  email: '',
};

export const user = (state = INITIAL_STATE_USER, action) => {
  switch (action.type) {
  case USER_ACTION:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};
