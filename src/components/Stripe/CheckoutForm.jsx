import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createBooking, paySpace } from '../../services/api.service';
export default function CheckoutForm({ pay, booking, idSpace }) {
	const [ succeeded, setSucceeded ] = useState(false);
	const [ error, setError ] = useState(null);
	const [ processing, setProcessing ] = useState('');
	const [ disabled, setDisabled ] = useState(true);
	const [ clientSecret, setClientSecret ] = useState('');
	const stripe = useStripe();
	const elements = useElements();

	const cardStyle = {
		style: {
			base: {
				color: '#132651',
				fontFamily: 'Roboto, sans-serif',
				fontSmoothing: 'antialiased',
				fontSize: '16px',
				'::placeholder': {
					color: '#132651'
				}
			},
			invalid: {
				color: '#fa755a',
				iconColor: '#fa755a'
			}
		}
	};
	const handleChange = async (event) => {
		// Listen for changes in the CardElement
		// and display any errors as the customer types their card details
		setDisabled(event.empty);
		setError(event.error ? event.error.message : '');
	};

	const handleSubmit = async (ev) => {
		ev.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setProcessing(true);

		const payload = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement)
		});
		const { error, paymentMethod } = payload;

		if (!error) {
			console.log('Stripe 23 | token generated!', paymentMethod);
			try {
				const { id } = paymentMethod;

				const response = await paySpace(pay, id);
				console.log('Stripe 35 | data', response.success);
				if (response.success) {
					console.log('CheckoutForm.js 25 | payment successful!');
					const reserve = await createBooking(idSpace, booking);
					setError(null);
					setProcessing(false);
					setSucceeded(true);
				}
			} catch (error) {
				console.log('CheckoutForm.js 28 | ', error.message);
				setError(`Payment failed ${error.message}`);
				setProcessing(false);
			}
		} else {
			console.log(error.message);
			setError(`Payment failed ${error.message}`);
			setProcessing(false);
		}
	};

	return (
		<form id="payment-form" onSubmit={handleSubmit}>
			<CardElement id="card-element" options={cardStyle} onChange={handleChange} />
			<button
				disabled={processing || disabled || succeeded}
				id="submit"
				style={{ backgroundColor: '#132651', color: 'white' }}
			>
				<span id="button-text">{processing ? <div className="spinner" id="spinner" /> : 'Pay'}</span>
			</button>
			{/* Show any error that happens when processing the payment */}
			{error && (
				<div className="card-error" role="alert">
					{error.message}
				</div>
			)}
			{/* Show a success message upon completion */}
			<p className={succeeded ? 'result-message' : 'result-message hidden'}>
				Pago completado. Su reserva esta efectuada.
				<a href={`https://dashboard.stripe.com/test/payments`}> Stripe dashboard.</a> Refresh the page to pay
				again.
			</p>
		</form>
	);
}
