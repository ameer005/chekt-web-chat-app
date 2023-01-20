import { create } from "zustand";
import { devtools } from "zustand/middleware";
import userSlice from "./slices/userSlice";
import switchStateSlice from "./slices/switchStateSlice";

const useStore = create(
  devtools((set, get) => ({
    ...userSlice(set, get),
    ...switchStateSlice,
  }))
);
