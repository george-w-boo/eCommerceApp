import React from "react";
import StripeCheckout from "react-stripe-checkout";

import logo from '../../assets/crown.svg';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51KLKU7EkacpzqUoUUvIz9cA1NvASORy2Wvxy5kdcq2QIkmymcUed6v1JeleOnUDcijSaMCHD8G8OQgLoG1uJpsWq00f9qBVxE9';

  const onToken = token => {
    console.log('token', token);
    alert('Payment Successful');
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
