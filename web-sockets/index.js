import socketIO from "socket.io-client";

// Configuring Sockets
const clientSocket = socketIO("http://10.0.0.11:5000", {
  transports: ["websocket"],
  jsonp: false
});

const adminSocket = socketIO("http://10.0.0.11:5000/admin", {
  transports: ["websocket"],
  jsonp: false
});

export { clientSocket, adminSocket };
