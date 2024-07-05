import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import emailReducer from "./features/email/emailSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  email: emailReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
