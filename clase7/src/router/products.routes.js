import { Router } from "express";
import express from "express";
import { productModel } from "../models/productModel.js";
const router = Router();
// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).send(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Delete product by Id
router.delete("/:id", async (req, res) => {
  try {
    const findOneAndDelete = await productModel.findByIdAndDelete(
      req.params.id,
    );
    res.status(200).send(findOneAndDelete);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.use(express.json());
// // Post product
router.post("/", async (req, res) => {
  try {
    const product = req.body;
    await productModel.create(product);
    res.status(200).send (product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// // Update product by Id
router.put("/:id", async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;
