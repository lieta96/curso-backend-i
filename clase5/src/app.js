import express from "express";
import ProductManager from "./dao/ProductManager.js";

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  // en el middleware agregamos a la request la instancia de la clase ProductManager ya que la vamos a usar en varias peticiones
  req.productManager = ProductManager;
  next();
});
app.get("/api/products", async (req, res) => {
  try {
    const products = await req.productManager.getProducts();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/products", async (req, res) => {
  try {
    const product = await req.productManager.createProduct(req.body);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put("/api/products/:id", async (req, res) => {
  try {
    const product = await req.productManager.updateProductById(
      req.params.id,
      req.body,
    );
    return res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.delete("/api/products/:id", async (req, res) => {
   try {
    const product = await req.productManager.deleteProductById(
      req.params.id,
    );
    return res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
