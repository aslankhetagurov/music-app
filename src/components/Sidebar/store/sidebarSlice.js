import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sidebarInfo: null,
    showSidebar: false,
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setAddSidebarInfo: (state, action) => {
            state.sidebarInfo = action.payload;
        },
        setToggleShowSidebar: (state, action) => {
            state.showSidebar = action.payload;
        },
    },
});

const { reducer, actions } = sidebarSlice;

export const { setAddSidebarInfo, setToggleShowSidebar } = actions;

export const selectSidebarInfo = (state) => state.sidebar.sidebarInfo;
export const selectShowSidebar = (state) => state.sidebar.showSidebar;

export default reducer;
