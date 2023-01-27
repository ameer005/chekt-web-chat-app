let token;
let user;
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
  user = JSON.parse(localStorage.getItem("user"));
}

const userSlice = (set, get) => ({
  user: user || null,
  token: token || null,
  email: "",
  requests: [],
  setUser: (user) => {
    set({ user: user });
  },
  setUserEmail: (email) => {
    set({ email: email });
  },
  setToken: (token) => {
    set({ token: token });
  },
  setRequest: (requests) => {
    set({ requests: requests });
  },
  removeUser: () => {
    set({ user: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
});

export default userSlice;
