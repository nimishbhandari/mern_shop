import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);

  const { loading, product, error } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Price: ${product.price}</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <h4>Description:</h4>
                {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  style={{ display: "block", width: "100%" }}
                  className="btn"
                  type="button"
                  disabled={product.countInStock < 1}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductScreen;
