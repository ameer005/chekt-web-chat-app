import React from "react";
import { io } from "socket.io-client";

const useSockets = () => {
  const socket = io("http://127.0.0.1:5000");
  return socket;
};

export default useSockets;
