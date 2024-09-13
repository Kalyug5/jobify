import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import jobSlice from "./components/pages/jobs/jobSlice";
import adminSlice from "./components/pages/admin/adminSlice";
import adminJobSlice from "./components/pages/admin/adminJobSlice";

export const store = configureStore({
  reducer: {
    user: authSlice,
    job: jobSlice,
    admin: adminSlice,
    adminJob: adminJobSlice,
  },
});
