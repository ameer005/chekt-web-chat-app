import { io } from "socket.io-client";

let URL = "https://chekt-backend.up.railway.app";

if (process.env.NODE_ENV !== "production") {
  URL = "http://127.0.0.1:5000";
}

const useSockets = () => {
  const socket = io(URL);
  return socket;
};

export default useSockets;
