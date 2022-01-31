import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import {
  CartIconContainer,
  ShoppingIcon,
  IconCount
 } from './cart-icon.styles';

const CartIcon = () => {
  const itemCount = useSelector(selectCartItemsCount);
  const dispatch = useDispatch();
  return (
    <CartIconContainer onClick={() => dispatch(toggleCartHidden())}>
      <ShoppingIcon className="shopping-icon" />
      <IconCount>{itemCount}</IconCount>
    </CartIconContainer>
  );
};

export default CartIcon;
