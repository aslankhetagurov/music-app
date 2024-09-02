import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAddUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
    },
});

const { reducer, actions } = authSlice;

export const { setAddUserInfo } = actions;

export const selectUserInfo = (state) => state.auth.userInfo;

export default reducer;
