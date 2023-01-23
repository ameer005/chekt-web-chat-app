const modalSlice = (set, get) => ({
  openSlideModal: false,
  showToastModal: false,
  toastProperties: {
    type: "",
    message: "",
  },

  setModalState: (modal) => {
    set(modal);
  },
});

export default modalSlice;
