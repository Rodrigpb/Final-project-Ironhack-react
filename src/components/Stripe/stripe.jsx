import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import './stripe.css'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe(process.env.REACT_APP_STRIPE);

export default function Stripe({pay, booking, id, change, closeDialog}) {
  return (
    <div className="Stripe">
      <Elements stripe={promise} >
        <CheckoutForm closeDialog={closeDialog} change={change} pay={pay} booking={booking} idSpace={id}/>
      </Elements>
    </div>
  );
}