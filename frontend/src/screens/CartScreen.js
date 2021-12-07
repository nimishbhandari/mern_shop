import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";

const CartScreen = () => {
  const productId = useParams().id;
  const dispatch = useDispatch();
  const qty = Number(useLocation().search.split("=")[1]);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    } else {
    }
  }, [dispatch, productId, qty]);

  return <div>Cart is working</div>;
};

export default CartScreen;
