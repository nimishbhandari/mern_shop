import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

//@desc     Fetch all products
//@routes   GET /api/products
//@access   PUBLIC
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

//@desc     Fetch product by id
//@routes   GET /api/products/:id
//@access   PUBLIC
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

export { getProductById, getProducts };
