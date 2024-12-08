import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  token: string | null;
  user: { id: string; email: string; role: string } | null;
}

const initializeState = (): AuthState => {
  const cookies = parseCookies();
  const token = cookies.authToken;

  if (token) {
    try {
      const decoded = jwtDecode<{ id: string; email: string; role: string }>(token);
      return {
        token,
        user: { id: decoded.id, email: decoded.email, role: decoded.role },
      };
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }

  return { token: null, user: null };
};

const authSlice = createSlice({
  name: "auth",
  initialState: initializeState(),
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; user: { id: string; email: string; role: string } }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
