import React from 'react';
import PropTypes from 'prop-types';

import { formatter } from './Utils';
import DonutChart from './DonutChart';

const MyAccount = ({ grossMoney, netMoney, totalSent, transactions }) => (
  <section>
    <h2>My Account</h2>
    <div className="information">
      <span>
        { formatter.format(totalSent) } <br/>
        total send
      </span>
      <span>
        <DonutChart percentage={ (netMoney / grossMoney) * 100 } />
      </span>
      <span>
        { formatter.format(netMoney) } <br/>
        left available
      </span>
    </div>
    <section className="transactions">
      <h4 className="align-left">Transactions</h4>
      <ul>
        { transactions.map((transaction, index) => (
          <li key={index}>
            <span className="align-left">
              <span>{ transaction.name }</span> <br/>
              <span className="email">{ transaction.email }</span>
            </span>
            <span>{ formatter.format(transaction.value) }</span>
          </li>
        )) }
      </ul>
    </section>
  </section>
);

MyAccount.propTypes = {
  grossMoney: PropTypes.number.isRequired,
  netMoney: PropTypes.number.isRequired,
  totalSent: PropTypes.number.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }))
};

export default MyAccount;