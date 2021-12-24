import React, { useEffect } from "react";
import { Col, ListGroup, Row, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useParams, Link } from "react-router-dom";
import { getOrderDetails } from "../actions/orderAction";

const OrderScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  if (!loading) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  return loading ? (
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
                      <Message variant="success">
                        Delivered on {order.deliveredAt}
                      </Message>
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
                      <Message variant="success">
                        Paid on {order.paidAt}
                      </Message>
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
                          {item.qty} X {item.price} = $ {item.qty * item.price}
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
                <Col>$ {order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>$ {order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax Price</Col>
                <Col>$ {order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>$ {order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;
