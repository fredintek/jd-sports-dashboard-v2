"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "@/redux/store";

type Props = {
  children: React.ReactNode;
};

const persistor = persistStore(store);

const AppWrapper = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {children}
        <Toaster position="top-right" />
      </PersistGate>
    </Provider>
  );
};

export default AppWrapper;
