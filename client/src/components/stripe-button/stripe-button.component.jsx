import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios';

import logo from '../../assets/crown.svg';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51KLKU7EkacpzqUoUUvIz9cA1NvASORy2Wvxy5kdcq2QIkmymcUed6v1JeleOnUDcijSaMCHD8G8OQgLoG1uJpsWq00f9qBVxE9';

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    }).then(response => {
      alert('Payment successful');
    }).catch(error => {
      console.log('Payment error: ', JSON.parse(error));
      alert(
        'There was an issue with your payment. Please, make sure you use the provided payment card.'
      )
    })
  }

  return (
    <StripeCheckout
      label="Pay Now"
      name="eCommerceApp Ltd."
      billingAddress
      shippingAddress
      image={logo}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
}

export default StripeCheckoutButton;
