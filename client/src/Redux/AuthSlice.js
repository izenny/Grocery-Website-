import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk("/auth/register", async (data) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/register",
    data,
    {
      withCredentials: true,
    }
  );
  return response.data;
});
export const loginUser = createAsyncThunk("/auth/login", async (data) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    data,
    {
      withCredentials: true,
    }
  );
  return response.data;
});
export const authCheck = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get("http://localhost:5000/api/auth/authcheck", {
    withCredentials: true,
    headers: {
      "Cache-Control": "no-store,no-cache,must-revalidate,proxy-revalidate",
    },
  });
  // console.log('response',response.data);

  return response.data;
});

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/logout",
    {},
    { withCredentials: true } // Place `withCredentials` here
  );
  return response.data;
});

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(authCheck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(authCheck.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { setUser } = AuthSlice.actions;
export default AuthSlice.reducer;
