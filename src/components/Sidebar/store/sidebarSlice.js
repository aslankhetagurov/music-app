import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sidebarInfo: null,
    showSidebar: false,
    sidebarList: null,
    sidebarInfoType: null,
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
        setAddSidebarInfoType: (state, action) => {
            state.sidebarInfoType = action.payload;
        },
        setAddSidebarList: (state, action) => {
            state.sidebarList = action.payload;
        },
    },
});

const { reducer, actions } = sidebarSlice;

export const {
    setAddSidebarInfo,
    setToggleShowSidebar,
    setAddSidebarInfoType,
    setAddSidebarList,
} = actions;

export const selectSidebarInfo = (state) => state.sidebar.sidebarInfo;
export const selectShowSidebar = (state) => state.sidebar.showSidebar;
export const selectSidebarInfoType = (state) => state.sidebar.sidebarInfoType;
export const selectSidebarList = (state) => state.sidebar.sidebarList;

export default reducer;
