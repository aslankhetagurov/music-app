import { useEffect, useRef, useState } from 'react';
import { IoMdClose, IoMdSearch } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

import {
    fetchSearchLists,
    selectDataLoadingStatus,
    selectSearchArtistsList,
    selectSearchSongsList,
    selectSearchValue,
    setAddSearchArtistsList,
    setAddSearchSongsList,
    setAddSearchValue,
} from './store/searchInputSlice';
import SmallSongItem from '../SmallSongItem/SmallSongItem';
import SmallArtistItem from '../SmallArtistItem/SmallArtistItem';
import './SearchInput.scss';

const SearchInput = () => {
    const dispatch = useDispatch();
    const searchValue = useSelector(selectSearchValue);
    const searchDataLoadingStatus = useSelector(selectDataLoadingStatus);
    const searchArtistsList = useSelector(selectSearchArtistsList);
    const searchSongsList = useSelector(selectSearchSongsList);
    const [searchResultToggle, setSearchResultToggle] = useState(false);
    const searchResultRef = useRef(null);

    useEffect(
        () => {
            const debounceFetchId =
                searchValue &&
                setTimeout(() => dispatch(fetchSearchLists(searchValue)), 300);

            if (!searchValue) {
                dispatch(setAddSearchArtistsList(null));
                dispatch(setAddSearchSongsList(null));
            }

            return () => {
                clearTimeout(debounceFetchId);
            };
        }, // eslint-disable-next-line
        [searchValue]
    );

    useEffect(() => {
        const handleHideSearchResult = (e) => {
            if (
                !searchResultRef.current?.contains(e.target) ||
                e.target.className === 'small-artist-item__artist-name' ||
                e.target.className === 'song-artist-name__item'
            ) {
                setSearchResultToggle(!searchResultToggle);
            }
        };

        searchResultToggle &&
            document.addEventListener('click', handleHideSearchResult);

        return () =>
            document.removeEventListener('click', handleHideSearchResult);

        // eslint-disable-next-line
    }, [searchResultToggle]);

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

    const handleInputValueClear = () => {
        dispatch(setAddSearchValue(''));
    };

    const handleFocus = () => {
        !searchResultToggle && setSearchResultToggle(!searchResultToggle);
    };

    return (
        <div ref={searchResultRef} onFocus={handleFocus} className="search">
            <div className="search__input-wrapper">
                <div className="search__img">
                    <IoMdSearch />
                </div>
                <input
                    className="search__input"
                    placeholder="Search by title, or artist..."
                    type="search"
                    value={searchValue}
                    onChange={handleInputValueChange}
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
                    (searchResultToggle &&
                        searchValue &&
                        (searchArtistsList?.length ||
                            searchSongsList?.length)) ||
                    searchDataLoadingStatus === 'error'
                        ? 'search__show'
                        : ''
                }`}
            >
                {!!searchArtistsList?.length && (
                    <ul className="search__result-artists">
                        <span className="search__result-title">Artists</span>
                        {renderSearchArtistList()}
                    </ul>
                )}
                {!!searchSongsList?.length && (
                    <ul className="search__result-songs">
                        <span className="search__result-title">Songs</span>
                        {renderSearchSongsList()}
                    </ul>
                )}
                {searchDataLoadingStatus === 'error' &&
                    'An error occurred, please try again'}
            </div>
        </div>
    );
};

export default SearchInput;
