// Coloque aqui suas actions

import { USER_LOGIN } from './namesOfActions';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  email,
});

export const testando = () => ({ email });
