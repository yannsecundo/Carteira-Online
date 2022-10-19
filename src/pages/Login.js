import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import userLogin from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };
  }

  validadeDoValidade = () => {
    const { email, password } = this.state;
    const number = 6;
    if (password.length >= number && email.includes('@') && email.includes('.com')) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validadeDoValidade());
  };

  login = () => {
    const { addEmail, history } = this.props;
    const { email } = this.state;

    addEmail(email);
    history.push('/carteira');
  };

  render() {
    const { email, password, isButtonDisabled } = this.state;
    return (
      <div>
        <label htmlFor="email">
          Email
          <input
            type="text"
            id="email"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChange }
            name="password"
          />
        </label>
        <button type="button" onClick={ this.login } disabled={ isButtonDisabled }>
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  addEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => dispatch(userLogin(email)),
});
export default connect(null, mapDispatchToProps)(Login);
