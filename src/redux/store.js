import { configureStore, combineReducers } from "@reduxjs/toolkit";
import submitvechilesReducer from "./reducers/submitvechilesReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import login from "./reducers/login";
import dayAndNightMode from "./reducers/dayAndNightMode";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  submitvechilesReducer,
  login,
  dayAndNightMode,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});
