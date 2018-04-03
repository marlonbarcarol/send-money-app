import React from 'react';
import PropTypes from 'prop-types';

import { formatter } from './Utils';

const ErrorMessage = ({ message, showMessage }) => (
  showMessage ? <span className="error-message">{ message }</span> : ''
);

class InputModel {
  constructor() {
    this.isValid = false;
    this.value = '';
    this.message = '';
  }
}

export class SendMoney extends React.Component {
  static initialState = () => {
    return {
      name: new InputModel(),
      email: new InputModel(),
      amount: new InputModel(),
      validForm: false,
      wasFormSubmitted: false
    }
  };

  static propTypes = {
    onSendMoney: PropTypes.func
  };

  state = SendMoney.initialState();

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  };

  setFormSubmittedErrorMessages(fields) {
    const newState = fields.map((field) => {
      return Object.assign(this.state[field], {
        isValid: false,
        message: `Please enter a valid ${field}`,
      });
    });

    this.setState({ 
      validForm: false,
      wasFormSubmitted: true,
      ...newState 
    });
  }

  setFormSubmittedErrorMessage(field, message = `Please enter a valid ${field}`) {
    this.setState({
      validForm: false,
      wasFormSubmitted: true,
      [field]: {
        isValid: false,
        message: message,
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const invalidInputs = ['name', 'email', 'amount'].filter((inputName) => {
       return !this.state[inputName].isValid;
    });
    
    if (invalidInputs.length) {
      this.setFormSubmittedErrorMessages(invalidInputs);
      return;
    }

    const amountNumber = Number(this.state.amount.value);

    if (amountNumber <= 0 || isNaN(amountNumber) || !isFinite(amountNumber)) {
      this.setFormSubmittedErrorMessage('amount');
      return;
    }

    if (amountNumber > Number.MAX_SAFE_INTEGER) {
      this.setFormSubmittedErrorMessage('amount', `Please enter an amount lower than ${Number.MAX_SAFE_INTEGER}`);
      return;
    }

    if (amountNumber > this.props.netMoney) {
      this.setFormSubmittedErrorMessage(
        'amount', 
        `The amount should be less than your total left ${formatter.format(this.props.netMoney)}`
      );
      return;
    }

    this.props.onSendMoney({
      name: this.state.name.value,
      email: this.state.email.value,
      value: amountNumber
    });

    this.setState(SendMoney.initialState());
  }

  onChange(event) {
    const fieldState = {
      value: event.target.value,
      isValid: true
    };

    if (!fieldState.value.trim() || !event.target.validity.valid) {
      fieldState.isValid = false;
    }

    this.setState({
      [event.target.name]: fieldState
    });
  }

  render() {
    return (
      <section>
        <h2>Send Money</h2>
        <form noValidate onSubmit={ this.handleSubmit }>

          <label className={ this.state.wasFormSubmitted && !this.state.name.isValid ? 'field-error' : '' }>
            <span className="label-text">Name</span>
            <input type="text" name="name" required
              value={ this.state.name.value } onChange={ this.onChange } />
            <ErrorMessage
              showMessage={ this.state.wasFormSubmitted && !this.state.name.isValid } 
              message={this.state.name.message} />
          </label>

          <label className={ this.state.wasFormSubmitted && !this.state.email.isValid ? 'field-error' : '' }>
            <span className="label-text">Email</span>
            <input type="email" name="email" required
              value={ this.state.email.value } onChange={ this.onChange } />
            <ErrorMessage 
              showMessage={ this.state.wasFormSubmitted && !this.state.email.isValid } 
              message={this.state.email.message} />
          </label>

          <label className={ this.state.wasFormSubmitted && !this.state.amount.isValid ? 'field-error' : '' }>
            <span className="label-text">Amount</span>
            <span className="label-inside-input">
              <span>£</span>
              <input type="number" name="amount" required step="0.1" maxLength="8" 
                value={ this.state.amount.value } onChange={ this.onChange } />
            </span>
            <ErrorMessage
              showMessage={ this.state.wasFormSubmitted && !this.state.amount.isValid } 
              message={this.state.amount.message} />
          </label>

          <button type="submit">Send</button>
        </form> 
      </section>
    );
  }
}