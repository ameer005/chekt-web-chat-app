import { io } from "socket.io-client";

const dataSlice = (set, get) => ({
  chats: [],
  socket: io("http://127.0.0.1:5000"),
  activeUsers: [],
  setDataState: (modal) => {
    set(modal);
  },
});

export default dataSlice;
