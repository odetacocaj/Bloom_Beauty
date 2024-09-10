import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("authToken") || null;
const initialIsAdmin = localStorage.getItem("isAdmin") === "true"; // Admin info from localStorage

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: initialToken,
    isAdmin: initialIsAdmin,
  },
  reducers: {
    login: (state, action) => {
      const { token, isAdmin } = action.payload;
      state.token = token;
      state.isAdmin = isAdmin;
      localStorage.setItem("authToken", token);
      localStorage.setItem("isAdmin", isAdmin);
    },
    logout: (state) => {
      state.token = null;
      state.isAdmin = false;
      localStorage.removeItem("authToken");
      localStorage.removeItem("isAdmin");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
