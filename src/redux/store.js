import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Choose your storage engine
import { AuthReducer } from "./slices/AuthSlice";
import { TodoReducer } from "./slices/TodoSlice";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  userReducer: AuthReducer,
  todoReducer: TodoReducer,
});

const persistConfig = {
  key: "root",
  storage,
  // Specify the reducers you want to persist
  // whitelist: ["user"], // In this example, we persist the 'user' reducer
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});
export const persistor = persistStore(store);
