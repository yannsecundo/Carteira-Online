import { USER_LOGIN } from '../actions/namesOfActions';

const INITIAL_STATE = { email: 'user' };

export const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state, email: action.email };

  default:
    return state;
  }
};

export const agoraVai = () => { };
