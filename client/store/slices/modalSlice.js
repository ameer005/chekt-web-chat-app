const modalSlice = (set, get) => ({
  openSlideModal: false,
  setModalState: (modal) => {
    set(modal);
  },
});

export default modalSlice;
