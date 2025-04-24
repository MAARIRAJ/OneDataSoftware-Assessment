import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./jobSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    jobs: jobReducer,
    user: userReducer,
  },
});
