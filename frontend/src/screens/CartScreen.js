import React, { useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button } from "react-bootstrap";
import Message from "../components/Message";

const CartScreen = () => {
  const productId = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const qty = Number(location.search.split("=")[1]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate(`/login?redirect=shipping`);
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    } else {
    }
  }, [dispatch, productId, qty]);

  return (
    <div>
      <Button className="btn btn-dark my-3" onClick={() => navigate(-1)}>
        Go Back
      </Button>

      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row style={{ padding: "10px 10px" }}>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={4}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>
                Total ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h3>
              <h3 className="cartPrice">
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn"
                style={{ display: "block", width: "100%" }}
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
