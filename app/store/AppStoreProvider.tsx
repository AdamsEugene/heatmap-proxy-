"use client";

import {
  createContext,
  useRef,
  useContext,
  type PropsWithChildren,
} from "react";
import { type StoreApi, useStore } from "zustand";

import { AppStoreSlice, createAppStore, initAppStore } from "./createAppStore";

export const AppStoreContext = createContext<StoreApi<AppStoreSlice> | null>(
  null,
);

export const AppStoreProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<StoreApi<AppStoreSlice>>();

  if (!storeRef.current) {
    storeRef.current = createAppStore(initAppStore());
  }

  return (
    <AppStoreContext.Provider value={storeRef.current}>
      {children}
    </AppStoreContext.Provider>
  );
};

export const useAppStore = <T,>(selector: (store: AppStoreSlice) => T): T => {
  const appStoreContext = useContext(AppStoreContext);

  if (!appStoreContext) {
    throw new Error(`useCounterStore must be use within AppStoreProvider`);
  }

  return useStore(appStoreContext, selector);
};
