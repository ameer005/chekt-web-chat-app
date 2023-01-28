import { create } from "zustand";
import { devtools } from "zustand/middleware";
import userSlice from "./slices/userSlice";
import switchStateSlice from "./slices/switchStateSlice";
import modalSlice from "./slices/modalSlice";
import dataSlice from "./slices/dataSlice";

const useStore = create(
  devtools((set, get) => ({
    ...userSlice(set, get),
    ...switchStateSlice(set, get),
    ...modalSlice(set, get),
    ...dataSlice(set, get),
  }))
);

export default useStore;
