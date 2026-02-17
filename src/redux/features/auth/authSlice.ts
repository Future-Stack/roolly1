import type { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

type TAuthState = {
    user: null | object;
    token: null | string;
    refreshToken: null | string;
}

const initialState: TAuthState = {
    user: null,
    token: null,
    refreshToken: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token, refreshToken } = action.payload;
            state.user = user;
            state.token = token;
            if (refreshToken) {
                state.refreshToken = refreshToken;
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
        }
    }
})

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentRefreshToken = (state: RootState) => state.auth.refreshToken;