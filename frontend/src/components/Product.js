import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import {Link} from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <div>
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="div">
            <div className="my-3">
              <Rating
                value={product.rating}
                text={` from ${product.numReviews} reviews`}
              />
            </div>
          </Card.Text>

          <Card.Text as="div">
            <h3>${product.price}</h3>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
