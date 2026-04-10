import { Router, urlencoded } from "express";
import express from "express";
import { attachManagerToRequest } from "../middlewares/products.middlewares.js";
import { uploader } from "../utils.js";
const router = Router();
router.use(attachManagerToRequest);

router.get("/", async (req, res) => {
  try {
    const products = await req.productManager.getProducts();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const product = await req.productManager.deleteProductById(req.params.id);
    return res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// express.json solo lo usaremos en los métodos que lean el body
// ---- urlencoded ----
// sirve para procesar las peticiones que vienen con el enctype por defecto de los formularios HTML: application/x-www-form-urlencoded
// Cuando un usuario envía un formulario común (nombre, email, etc.), los datos viajan en el cuerpo (body) de la petición HTTP como una cadena de texto parecida a esto: nombre=Julieta&apellido=Garcia&stack=frontend
// Sin el middleware, si intentas hacer un console.log(req.body), obtendrás undefined. El middleware urlencoded:
// Intercepta la petición antes de que llegue a tu ruta.
// Analiza esa cadena de texto.
// Crea un objeto JavaScript y lo asigna a req.body.
// extended: true: Usa la librería qs. Es mucho más potente y permite enviar objetos anidados.
router.use(express.json(), urlencoded({ extended: true }));
router.post("/",uploader.single("thumbnail") // lo pasamos como middleware para que ataje el post 
, async (req, res) => {
  
  try {
    req.body.thumbnails=[req.file.filename]
    const product = await req.productManager.createProduct(req.body);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.put("/:id", async (req, res) => {
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

export default router;
