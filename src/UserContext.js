import React from 'react';

/**
 * I am using the new createContext because it is only one page
 * and I am reluctant to add unecessary libraries(it's unecessary in this case).
 */
const UserContext = React.createContext();

export const UserConsumer = UserContext.Consumer;

export class UserProvider extends React.Component {
  state = {
    grossMoney: 50000,
    netMoney: 0,
    totalSent: 0,
    transactions: [
      { name: 'Natalia', email: 'natalia@cloud.com', value: 1500 },
      { name: 'Thomas', email: 'thomas@cloud.com', value: 500 },
      { name: 'Martin', email: 'natalia@cloud.com', value: 2000 }
    ]
  };

  constructor(props) {
    super(props);

    this.addTransaction = this.addTransaction.bind(this);
  };

  componentDidMount() {
    const totalSent = this.calculateTotalSent();

    this.setState({
      netMoney: this.state.grossMoney - totalSent,
      totalSent: totalSent,
    });
  }

  addTransaction(transaction) {
    const totalSent = this.state.totalSent + transaction.value;

    this.setState({
      netMoney: this.state.grossMoney - totalSent,
      totalSent: totalSent,
      transactions: [ ...this.state.transactions, transaction ],
    });
  };

  calculateTotalSent() {
    return this.state.transactions.reduce((totalSent, transaction) => {
      return totalSent = transaction.value + totalSent;
    }, 0);
  }

  render() {
    return (
      <UserContext.Provider value={{ state: this.state,  addTransaction: this.addTransaction }}>
        { this.props.children }
      </UserContext.Provider>
    );
  };
}