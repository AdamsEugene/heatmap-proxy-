import { createStore } from "zustand/vanilla";

import {
  MicsSlice,
  MicsState,
  createMicsSlice,
  defaultMicsState,
  initMicsStore,
} from "./micsSlice";

export type AppStoreState = MicsState;
export type AppStoreSlice = MicsSlice;

export const initAppStore = (): AppStoreState => {
  return { ...initMicsStore() };
};

export const defaultAppState: AppStoreState = { ...defaultMicsState };

export const createAppStore = (initState: AppStoreState = defaultAppState) => {
  return createStore<AppStoreSlice>()((...a) => ({
    ...createMicsSlice(initState)(...a),
  }));
};
