import { configureStore } from "@reduxjs/toolkit";
import temperatureReducer from "./features/temperatureSlice";

const reducer = {
  temperature: temperatureReducer,
};

const store = configureStore({
  reducer: reducer,
  // devTools: true,
});

export default store;
