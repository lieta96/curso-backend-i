import express from "express";
import productsRouter from "./routes/products.routes.js";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.routes.js";
const app = express();
// configuramos la ruta de los archivos estáticos
app.use(express.static(__dirname + "/public"));
// -------- VIEWS --------
// 1. Seteamos el motor de vista, le ponemos el nombre de la librería que usaremos
app.set("view engine", "handlebars");
// 2. Definimos como motor de vista el que nombramos en el paso anterior y lo inicializamos con el método engine de handlebars
app.engine(
  "handlebars",
  engine(
    // se le pueden pasar opciones como
    // {
    // defaultLayout: 'main',
    // helpers: {
    //   // Aquí se registran helpers personalizados, funciones que extienden la lógica en las vistas. Por ejemplo, un helper para formatear fechas.
    // partialsDir:[]
    // Partials: fragmentos de vistas reutilizables, como cabeceras o pies de página.
    // }
    {
      defaultLayout: "main",
      helpers: {
        isStock: (stock) => stock > 0,
      },
      partialsDir: [__dirname + "/views/partials/"],
    },
  ),
);
// 3. Definimos en qué carpeta guardaremos las vistas
app.set("views", __dirname + "/views");
// -------- --------
app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/", viewsRouter);
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
