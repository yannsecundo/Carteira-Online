import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { expenses, email } = this.props;
    const totalExpenses = expenses.reduce((total, expense) => (
      total
        + Number(expense.value)
        * Number(expense.exchangeRates[expense.currency].ask)
    ), 0);
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{ totalExpenses.toFixed(2) }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
