import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

axios.defaults.withCredentials = true;

const initialState = {
  userSignup: {},
  userSignupLoding: false,
  userSignupError: {},

  userDetails: {},
  userDetailsLoading: false,
  userDetailsError: {},

  getUserData: {},
  getUserDataLoading: false,
  getUserDataError: {},

  logoutData: {},
  logoutDataLoading: false,
  logoutDataError: {},

  updateUserData: {},
  updateUserDataLoading: false,
  updateUserDataError: {},
};

export const signUp = createAsyncThunk("signUp/signUp", async (data) => {
  const response = await axios.post(
    "http://localhost:8080/api/v1/user/register",
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response?.data;
});

export const login = createAsyncThunk("login", async (data) => {
  const response = await axios.post(
    "http://localhost:8080/api/v1/user/login",
    data
  );
  return response.data;
});

export const getUser = createAsyncThunk("getUser/getUser", async () => {
  const response = await axios.get("http://localhost:8080/api/v1/user/getuser");
  return response.data;
});

export const logout = createAsyncThunk("logout/logout", async () => {
  const response = await axios.get("http://localhost:8080/api/v1/user/logout");
  return response.data;
});

export const updateUser = createAsyncThunk(
  "updateUser/updateUser",
  async (data) => {
    const response = await axios.post(
      "http://localhost:8080/api/v1/user/profile/update",
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.userSignupLoding = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.userSignup = action.payload;
        state.userSignupLoding = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.userSignupError = action.error.message;
        state.userSignupLoding = false;
      })
      .addCase(login.pending, (state) => {
        state.userDetailsLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.getUserData = action.payload.user;
        state.userDetails = action.payload.user;
        state.userDetailsLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.userDetailsError = action.error.message;
        state.userDetailsLoading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.getUserDataLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.getUserData = action.payload;
        state.getUserDataLoading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.getUserDataError = action.error.message;
        state.getUserDataLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.logoutDataLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.getUserData = {};
        state.logoutData = action.payload;
        state.logoutDataLoading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutDataError = action.error.message;
        state.logoutDataLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateUserDataLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.getUserData = action.payload.user;
        state.updateUserData = action.payload.user;
        state.updateUserDataLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserDataError = action.error.message;
        state.updateUserDataLoading = false;
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
