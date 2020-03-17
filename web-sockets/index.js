import socketIO from "socket.io-client";

// Configuring Sockets
clientSocket = socketIO("http://localhost:5000", {
  transports: ["websocket"],
  jsonp: false
});

adminSocket = socketIO("http://localhost:5000/admin", {
  transports: ["websocket"],
  jsonp: false
});

export { clientSocket, adminSocket };
