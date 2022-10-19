// Coloque aqui suas actions
import USER_LOGIN from './namesOfActions';

const userLogin = (email) => ({
  type: USER_LOGIN,
  email,
});

export default userLogin();
