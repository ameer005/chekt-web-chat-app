const dataSlice = (set, get) => ({
  chats: [],
  setDataState: (modal) => {
    set(modal);
  },
});

export default dataSlice;
