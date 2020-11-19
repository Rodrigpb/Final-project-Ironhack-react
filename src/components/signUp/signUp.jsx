import React from 'react';
import FormUserDetails from './formUserDetails';
import FormBusinessDetails from './formBusinessDetails';
import { createUser } from '../../services/api.service';
import { useHistory } from 'react-router-dom';

const validations = {
	firstName: (value) => value.length > 1,
	lastName: (value) => value.length > 1,
	email: (value) => {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(value).toLowerCase());
	},
	password: (value) => value.length > 1,
	number: (value) => {
		var str = value.toString().replace(/\s/g, '');
		return str.length === 9 && /^[679]{1}[0-9]{8}$/.test(str);
	}
};

export default class SignUp extends React.Component {
	state = {
		data: {
			step: 1,
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			avatar: '',
			number: '',
			nif: '',
			razonSocial: '',
			direccion: ''
		},
		error: {
			firstName: true,
			lastName: true,
			email: true,
			password: true,
			number: true
		},
		touch: {},
		errorMessage: {
			error: false,
			message: ''
		}
	};

	nextStep = () => {
		const { step } = this.state.data;
		this.setState({
			data: { ...this.state.data, step: step + 1 }
		});
	};

	prevStep = () => {
		const { step } = this.state.data;
		this.setState({
			data: { ...this.state.data, step: step - 1 }
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { history } = this.props;

		const newUser = async () => {
			try {
				const user = await createUser(this.state.data);

				history.push({
					pathname: '/login',
					state: { message: user }
				});
			} catch (e) {
				if (e.response) {
					console.log(e.response.data);
					this.setState({
						...this.state,
						errorMessage: {
							error: true,
							message: e.response.data.message
						}
					});
				}
			}
		};
		newUser();
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		const isValid = validations.hasOwnProperty(name) ? validations[name](value) : '';

		this.setState({
			data: { ...this.state.data, [name]: value },
			error: {
				...this.state.error,
				[name]: isValid !== '' && !isValid
			},
			touch: {
				...this.state.touch
			},
			errorMessage: {
				error: false,
				message: ''
			}
		});
	};

	handleBlur = (e) => {
		const { name } = e.target;
		this.setState({
			...this.state,
			touch: {
				...this.state.touch,
				[name]: true
			}
		});
	};

	render() {
		const { step } = this.state.data;
		const isError = Object.values(this.state.error).some((el) => el);

		switch (step) {
			case 1:
				return (
					<FormUserDetails
						nextStep={this.nextStep}
						handleChange={this.handleChange}
						handleBlur={this.handleBlur}
						value={this.state}
					/>
				);
			case 2:
				return (
					<FormBusinessDetails
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={this.handleChange}
						handleBlur={this.handleBlur}
						handleSubmit={this.handleSubmit}
						value={this.state}
						disable={isError}
					/>
				);
			default:
				return null;
		}
	}
}
