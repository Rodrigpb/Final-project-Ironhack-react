import React from 'react';
import FormUserDetails from './formUserDetails'
import FormBusinessDetails from './formBusinessDetails'
import { useAuthContext } from '../../contexts/AuthContext';


export default class SignUp extends React.Component {
 
  state= {
      data : {
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
    },
      error: {
        firstName: true,
        lastName: true,
        email: true,
        password: true
      },
      touch: {}
  }

  
  

nextStep = () => {
  const { step } = this.state.data;
  this.setState({
    step: step + 1
  });
};

prevStep = () => {
  const { step } = this.state.data;
  this.setState({
    step: step - 1
  });
};

handleChange = (e) => {
  const { name, value } = e.target;
  
  this.setState({
    data: { ...this.state.data, [name]: value },
    error: {},
    touch:{}
    });
};

handleSubmit = (e) => {
  e.preventDefault();
  console.log("Hola")

  const newUser = async () => {
    
  }
}

render() {
    const { step } = this.state.data;

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