import express from "express";
import products from "./data/products.js";

const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(5000, () => {
  console.log("Server Running on PORT 5000");
});
