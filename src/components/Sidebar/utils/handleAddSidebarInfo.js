import {
    setAddSidebarInfo,
    setAddSidebarInfoType,
    setAddSidebarList,
    setToggleShowSidebar,
} from '../store/sidebarSlice';

const handleAddSidebarInfo = (
    e,
    dispatch,
    className,
    data,
    sidebarType,
    sidebarList = null
) => {
    if (e.target.className !== className) {
        dispatch(setAddSidebarInfo(data));
        dispatch(setAddSidebarInfoType(sidebarType));
        dispatch(setToggleShowSidebar(true));
        dispatch(setAddSidebarList(sidebarList));
    }
};

export default handleAddSidebarInfo;
