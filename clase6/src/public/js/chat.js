// instanciamos el socker
const clientSocket = io({
  auth: {
    user: userLogged,
  },
}); // para que io funcione, antes en el frontend debemos agregar un script que llame a socket.io (ver /views/chat.handlebars)

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const message = document.querySelector("input").value;
  // Para que el mensaje llegue al servidor tengo que emitir un evento. Pasamos como primer argumento el nombre del evento
  clientSocket.emit("new-message", { message:message, user: userLogged });
  document.querySelector("input").value = "";
});
clientSocket.on("send-message", ({ message, id ,user}) => {
  const chatBox = document.querySelector("#chat-box");
  const messageElement = document.createElement("p");
  if (id == clientSocket.id) {
    messageElement.innerHTML += `<div class="message self">
            <strong>Tú:</strong> ${message}
        </div>`;
  } else {
    messageElement.innerHTML += `<div class="message other">
            <strong>${user}:</strong> ${message}
        </div>`;
  }
  chatBox.appendChild(messageElement);
});
