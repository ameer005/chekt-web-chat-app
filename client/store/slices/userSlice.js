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
  setUser: (user) => {
    set({ user: user });
  },
  setUserEmail: (email) => {
    set({ email: email });
  },
  setToken: (token) => {
    set({ token: token });
  },
  removeUser: () => {
    set({ user: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
});

export default userSlice;
