import socketIO from "socket.io-client";
import { SOCKET_URL } from "../API";
// Configuring Sockets
const clientSocket = socketIO(`${SOCKET_URL}`, {
  transports: ["websocket"],
  jsonp: false
});

const adminSocket = socketIO(`${SOCKET_URL}/admin`, {
  transports: ["websocket"],
  jsonp: false
});

export { clientSocket, adminSocket };
