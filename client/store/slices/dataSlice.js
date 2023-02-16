import { io } from "socket.io-client";

let URL = "https://chekt-backend.up.railway.app";

if (process.env.NODE_ENV !== "production") {
  URL = "http://127.0.0.1:5000";
}

const dataSlice = (set, get) => ({
  chats: [],
  socket: io(URL),
  activeUsers: [],
  setDataState: (modal) => {
    set(modal);
  },
});

export default dataSlice;
