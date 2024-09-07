import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    alertText: null,
    alertType: 'info',
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAddAlertText: (state, action) => {
            state.alertText = action.payload;
        },
        setAddAlertType: (state, action) => {
            state.alertType = action.payload;
        },
    },
});

const { reducer, actions } = alertSlice;

export const { setAddAlertText, setAddAlertType } = actions;

export const selectAlertText = (state) => state.alert.alertText;
export const selectAlertType = (state) => state.alert.alertType;

export default reducer;
