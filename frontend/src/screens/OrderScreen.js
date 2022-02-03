import React, { useEffect } from "react";
import { Col, ListGroup, Row, Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from "../actions/orderAction";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

const OrderScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const orderId = id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      console.log("");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    orderId,
    successPay,
    successDeliver,
    order,
  ]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const payHandler = () => {
    dispatch(payOrder(orderId));
  };

  return loading || loadingPay ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping Details</h2>
              <div className="grid1">
                <div>
                  <h4>Name:</h4>
                  <p>{order.user.name}</p>
                </div>
                <div>
                  <h4>Email:</h4>
                  <p>{order.user.email}</p>
                </div>
              </div>

              <div className="grid1">
                <div>
                  <h4> Address : </h4>
                  <p>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                </div>
                <div>
                  <p>
                    {order.isDelivered ? (
                      <Message variant="success">Delivered</Message>
                    ) : (
                      <Message variant="danger">Not Delivered</Message>
                    )}
                  </p>
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <div className="grid1">
                <div>
                  <h4> Method : </h4>
                  <p>{order.paymentMethod}</p>
                </div>
                <div>
                  <p>
                    {order.isPaid ? (
                      <Message variant="success">Paid</Message>
                    ) : (
                      <Message variant="danger">Not Paid</Message>
                    )}
                  </p>
                </div>
              </div>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your Order Is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X {item.price} = &#8377;{" "}
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>&#8377;{order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>&#8377;{order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax Price</Col>
                <Col>&#8377; {order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>$ {order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            {loadingDeliver && <Loader />}
            {userInfo && !order.isPaid && !userInfo.isAdmin && (
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn"
                  variant="success"
                  style={{ display: "block", width: "100%" }}
                  onClick={payHandler}
                >
                  Pay
                </Button>
              </ListGroup.Item>
            )}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn"
                    variant="success"
                    style={{ display: "block", width: "100%" }}
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;
