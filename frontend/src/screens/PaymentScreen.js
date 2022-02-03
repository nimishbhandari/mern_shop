import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method </Form.Label>

            <Col>
              <Form.Check
                type="radio"
                label="Cash"
                id="Cash"
                name="Cash"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button className="my-3" type="submit" variant="success">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default PaymentScreen;
