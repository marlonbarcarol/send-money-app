import React, { Component } from 'react';
import './App.css';
import { UserProvider, UserConsumer } from './UserContext';
import { SendMoney } from './SendMoney';
import MyAccount from './MyAccount';

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserProvider>
          <UserConsumer>
            { (context) => (
              <React.Fragment>
                <SendMoney 
                  netMoney={ context.state.netMoney } 
                  onSendMoney={ context.addTransaction } />
                <MyAccount
                  netMoney={ context.state.netMoney }
                  grossMoney={ context.state.grossMoney }
                  totalSent={ context.state.totalSent }
                  transactions={ context.state.transactions }/>
              </React.Fragment>
            )}
          </UserConsumer>
        </UserProvider>
      </div>
    );
  }
}

export default App;
