import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
  TestWarning
} from './checkout.styles';

const Checkout = ({cartItems, total}) => (
  <CheckoutContainer>
    <CheckoutHeader>
      <HeaderBlock>
        <span>Product</span>
      </HeaderBlock>
      <HeaderBlock>
        <span>Description</span>
      </HeaderBlock>
      <HeaderBlock>
        <span>Quantity</span>
      </HeaderBlock>
      <HeaderBlock>
        <span>Price</span>
      </HeaderBlock>
      <HeaderBlock>
        <span>Remove</span>
      </HeaderBlock>
    </CheckoutHeader>
    {cartItems.map(cartItem => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <Total>TOTAL: ${total}</Total>
    <TestWarning>
      *Please use the following payment card for payments*
      <br />
      4242 4242 4242 4242 - Exp: 01/24 - CVV: 123
    </TestWarning>
    <StripeCheckoutButton price={total} />
  </CheckoutContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(Checkout);
