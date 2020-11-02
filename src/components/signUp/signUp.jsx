import React from 'react';
import FormUserDetails from './formUserDetails'
import FormBusinessDetails from './formBusinessDetails'

export default class SignUp extends React.Component {
 
  state= {
      step: 1,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      avatar: '',
      number: '',
      nif:'',
      razonSocial: '',
      direccion: ''
  }
  
// Proceed to next step
nextStep = () => {
  const { step } = this.state;
  this.setState({
    step: step + 1
  });
};

// Go back to prev step
prevStep = () => {
  const { step } = this.state;
  this.setState({
    step: step - 1
  });
};

// Handle fields change
handleChange = input => e => {
  this.setState({ [input]: e.target.value });
};

handleSubmit = (e) => {
  e.preventDefault();
  console.log("Hola")
}

render() {
    const { step } = this.state;

    switch (step) {
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            value={this.state}
          />
        );
      case 2:
        return (
          <FormBusinessDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            value={this.state}
          />
        );
      default:
        return null
    }
  }
}