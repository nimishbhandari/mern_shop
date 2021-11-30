import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

//@desc     Fetch all products
//@routes   GET /api/products
//@access   PUBLIC
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

//@desc     Fetch product by id
//@routes   GET /api/products/:id
//@access   PUBLIC
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    return res.json(product);
  } catch (error) {
    return res.status(404).send({ message: "Product not Found" });
  }
});

export default router;
