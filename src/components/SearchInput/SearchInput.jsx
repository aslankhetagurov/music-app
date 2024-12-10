import { useEffect, useRef, useState } from 'react';
import { IoMdClose, IoMdSearch } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

import {
    fetchSearchLists,
    selectDataLoadingStatus,
    selectSearchAlbumsList,
    selectSearchArtistsList,
    selectSearchSongsList,
    selectSearchValue,
    setAddSearchAlbumsList,
    setAddSearchArtistsList,
    setAddSearchSongsList,
    setAddSearchValue,
} from './store/searchInputSlice';
import SmallSongItem from '../SmallSongItem/SmallSongItem';
import SmallArtistItem from '../SmallArtistItem/SmallArtistItem';
import SmallAlbumItem from '../SmallAlbumItem/SmallAlbumItem';
import './SearchInput.scss';

const SearchInput = () => {
    const dispatch = useDispatch();
    const searchValue = useSelector(selectSearchValue);
    const searchDataLoadingStatus = useSelector(selectDataLoadingStatus);
    const searchArtistsList = useSelector(selectSearchArtistsList);
    const searchSongsList = useSelector(selectSearchSongsList);
    const searchAlbumsList = useSelector(selectSearchAlbumsList);
    const [searchResultToggle, setSearchResultToggle] = useState(false);
    const [showInputToggle, setShowInputToggle] = useState(false);
    const searchResultRef = useRef(null);

    useEffect(
        () => {
            const debounceFetchId =
                searchValue &&
                setTimeout(() => dispatch(fetchSearchLists(searchValue)), 400);

            if (!searchValue) {
                !!searchArtistsList?.length &&
                    dispatch(setAddSearchArtistsList(null));
                !!searchSongsList?.length &&
                    dispatch(setAddSearchSongsList(null));
                !!searchAlbumsList?.length &&
                    dispatch(setAddSearchAlbumsList(null));
            }

            return () => {
                clearTimeout(debounceFetchId);
            };
        }, // eslint-disable-next-line
        [searchValue]
    );

    useEffect(() => {
        const handleHideSearchResult = (e) => {
            if (e.target.className === 'search__close-btn') {
                searchResultToggle &&
                    setSearchResultToggle(!searchResultToggle);
            } else if (
                !searchResultRef.current?.contains(e.target) ||
                e.target.className === 'small-artist-item__artist-name' ||
                e.target.className === 'artist-name__item' ||
                e.target.className === 'small-song-item__title'
            ) {
                searchResultToggle &&
                    setSearchResultToggle(!searchResultToggle);
                showInputToggle && setShowInputToggle(!showInputToggle);
            }
        };

        (searchResultToggle || showInputToggle) &&
            document.addEventListener('click', handleHideSearchResult);

        return () =>
            document.removeEventListener('click', handleHideSearchResult);

        // eslint-disable-next-line
    }, [searchResultToggle, showInputToggle]);

    function handleInputValueChange(e) {
        dispatch(setAddSearchValue(e.target.value));
    }

    const renderSearchSongsList = () =>
        searchSongsList?.map((songData) => (
            <li key={songData.song_id}>
                <SmallSongItem songData={songData} />
            </li>
        ));

    const renderSearchArtistList = () =>
        searchArtistsList?.map((artistInfo) => (
            <li key={artistInfo.artist_id}>
                <SmallArtistItem artistInfo={artistInfo} />
            </li>
        ));

    const renderSearchAlbumsList = () =>
        searchAlbumsList?.map((albumData) => (
            <li key={albumData.album_id}>
                <SmallAlbumItem albumData={albumData} />
            </li>
        ));

    const handleInputValueClear = () => {
        dispatch(setAddSearchValue(''));
    };

    const handleFocus = () => {
        !searchResultToggle && setSearchResultToggle(!searchResultToggle);
    };

    const handleShowInput = () => {
        setShowInputToggle(!showInputToggle);
        searchResultToggle && setSearchResultToggle(!searchResultToggle);
    };

    return (
        <div ref={searchResultRef} className="search">
            <div className="search__show-btn" onClick={handleShowInput}>
                <IoMdSearch />
            </div>
            <div
                className={`search__input-wrapper ${
                    showInputToggle ? 'search__show' : ''
                }`}
            >
                <div className="search__icon">
                    <IoMdSearch />
                </div>
                <input
                    className="search__input"
                    placeholder="Search by title, artist, or album..."
                    type="search"
                    value={searchValue}
                    onChange={handleInputValueChange}
                    onFocus={handleFocus}
                />
                {searchValue && (
                    <button
                        className="search__close-btn"
                        onClick={handleInputValueClear}
                    >
                        <IoMdClose />
                    </button>
                )}
            </div>

            <div
                className={`search__result ${
                    ((searchResultToggle || showInputToggle) &&
                        searchValue &&
                        (searchArtistsList?.length ||
                            searchSongsList?.length)) ||
                    searchDataLoadingStatus === 'error'
                        ? 'search__result-show'
                        : ''
                } 
                
                `}
            >
                {!!searchArtistsList?.length && (
                    <ul className="search__result-items">
                        <span className="search__result-title">Artists</span>
                        {renderSearchArtistList()}
                    </ul>
                )}
                {!!searchSongsList?.length && (
                    <ul className="search__result-items">
                        <span className="search__result-title">Songs</span>
                        {renderSearchSongsList()}
                    </ul>
                )}
                {!!searchAlbumsList?.length && (
                    <ul className="search__result-items">
                        <span className="search__result-title">Albums</span>
                        {renderSearchAlbumsList()}
                    </ul>
                )}
                {searchDataLoadingStatus === 'error' &&
                    'An error occurred, please try again'}
            </div>
        </div>
    );
};

export default SearchInput;
