import { Router, urlencoded } from "express";
import ProductManager from "../dao/ProductManager.js";
const router = Router();
router.get("/", (req, res) => {
  // para devolver las vistas que creamos con el handlebars usamos el método render
  // el primer parámetro es el archivo a renderizar, en este caso index.handlebars
  // puede tener un segundo parámetro que serán variables pasadas dentro de un objeto y se usan en la vista
  res.render("index");
});
router.get("/products", async (req, res) => {
  const products = await ProductManager.getProducts();
  res.render("products.handlebars", { products: products });
});
router.use(urlencoded({ extended: true }));
router.get("/add-product", async (req, res) => {
  res.render("product-form.handlebars");
});
export default router;
