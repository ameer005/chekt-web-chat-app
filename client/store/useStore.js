import { create } from "zustand";
import { devtools } from "zustand/middleware";
import userSlice from "./slices/userSlice";
import switchStateSlice from "./slices/switchStateSlice";
import modalSlice from "./slices/modalSlice";

const useStore = create(
  devtools((set, get) => ({
    ...userSlice(set, get),
    ...switchStateSlice(set, get),
    ...modalSlice(set, get),
  }))
);

export default useStore;
