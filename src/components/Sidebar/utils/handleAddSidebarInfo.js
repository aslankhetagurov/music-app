import {
    setAddSidebarInfo,
    setAddSidebarInfoType,
    setAddSidebarList,
    setToggleShowSidebar,
} from '../store/sidebarSlice';

const handleAddSidebarInfo = (
    e,
    dispatch,
    classNames,
    data,
    sidebarType,
    sidebarList = null
) => {
    if (
        classNames.every((className) => e.target.className !== className) &&
        window.innerWidth > 600
    ) {
        dispatch(setAddSidebarInfo(data));
        dispatch(setAddSidebarInfoType(sidebarType));
        dispatch(setToggleShowSidebar(true));
        dispatch(setAddSidebarList(sidebarList));
    }
};

export default handleAddSidebarInfo;
