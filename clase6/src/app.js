import express from "express";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js";
import { engine } from "express-handlebars";

const app = express();
app.use(express.static(__dirname + "/public"));

// Seteamos motor de vistas
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// Seteamos rutas
app.use("/", viewsRouter);

// Levantamos el servidor
const httpServer = app.listen(3000, () => {
  console.log("Server running on port 3000");
});

const socketServer = new Server(httpServer, {
  // se le puede pasar un objeto de configuración
  cors: {
    origin: "*", // Para desarrollo local, permite todas las conexiones
  },
});
// .on escucha eventos
socketServer.on("connection", (clientSocket) => {
  // re recibe info del clientSocket
  console.log("Se ha conectado un cliente ", clientSocket.id);
  clientSocket.on("new-message", ({ message, user }) => {
    console.log(message);
    socketServer.emit("send-message", {
      message: message,
      id: clientSocket.id,
      user: user,
    }); //el server manda a todos
    // clientSocket.emit("send-message", message) //el server manda al emisor
    // clientSocket.broadcast.emit("send-message", message) //envia a todos MENOS al emisor
  });
});

// CONTINUAR EN LA HORA 45
