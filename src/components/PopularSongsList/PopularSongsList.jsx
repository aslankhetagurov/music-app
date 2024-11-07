import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ImSpinner2 } from 'react-icons/im';

import SquareSongItem from '../SquareSongItem/SquareSongItem';
import {
    fetchPopularSongs,
    selectPopularSongs,
    selectPopularSongsLoadingStatus,
} from './store/popularSongsSlice';
import { selectCurrentSongsList } from '../../store/slices/generalStateSlice';
import handleAddCurrentList from '../../utils/handleAddCurrentSongsList';

import './PopularSongsList.scss';

const PopularSongsList = () => {
    const currentSongslist = useSelector(selectCurrentSongsList);
    const popularSongs = useSelector(selectPopularSongs);
    const songsLoadingStatus = useSelector(selectPopularSongsLoadingStatus);
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const showAllItems = pathname === '/songs/popular-songs';

    const sliderRef = useRef(null);
    const sliderItemsRef = useRef(null);
    const itemCount = popularSongs.length;
    const startTouchPosition = useRef(null);
    const [itemCounter, setItemCounter] = useState(0);
    const [translateWidth, setTranslateWidth] = useState(0);
    const [sliderOn, setSliderOn] = useState(false);

    useEffect(
        () => {
            dispatch(fetchPopularSongs(showAllItems ? 50 : 10));
        }, // eslint-disable-next-line
        []
    );

    const renderItems = popularSongs.map(({ id, ...data }) => (
        <SquareSongItem
            key={id}
            songData={data}
            handleAddCurrentList={() =>
                handleAddCurrentList(currentSongslist, popularSongs)
            }
        />
    ));

    const handlePrevSlide = () => {
        if (!itemCounter)
            sliderItemsRef.current.style.transition = 'transform 500ms ease';

        if (itemCounter <= 0) {
            sliderItemsRef.current.childNodes[
                itemCount - Math.abs(itemCounter - 1)
            ].style.transform = `translateX(-${154 * itemCount}px)`;
        } else {
            sliderItemsRef.current.childNodes[
                itemCounter - 1
            ].style.transform = `translateX(${0}px)`;
        }

        sliderItemsRef.current.style.transform = `translateX(${
            translateWidth + 154
        }px)`;

        setTranslateWidth(translateWidth + 154);

        if (itemCounter === Number(`-${itemCount - 1}`)) {
            setTimeout(() => {
                sliderItemsRef.current.style.transition = 'transform 0ms';

                sliderItemsRef.current.style.transform = `translateX(${0}px)`;

                sliderItemsRef.current.childNodes.forEach((el) => {
                    el.style.transform = 'translateX(0)';
                });
                setItemCounter(0);
                setTranslateWidth(0);
            }, 500);
        } else {
            setItemCounter(itemCounter - 1);
        }
    };

    const handleNextSlide = () => {
        if (!itemCounter)
            sliderItemsRef.current.style.transition = 'transform 500ms ease';

        if (itemCounter < 0) {
            setTimeout(() => {
                sliderItemsRef.current.childNodes[
                    itemCount - Math.abs(itemCounter)
                ].style.transform = `translateX(${0}px)`;
            }, 500);
        } else {
            if (itemCounter) {
                sliderItemsRef.current.childNodes[
                    Math.abs(itemCounter - 1)
                ].style.transform = `translateX(${154 * itemCount}px)`;
            }
        }

        sliderItemsRef.current.style.transform = `translateX(${
            translateWidth - 154
        }px)`;

        setTranslateWidth(translateWidth - 154);

        if (itemCounter === itemCount - 1) {
            setTimeout(() => {
                sliderItemsRef.current.style.transition = 'transform 0ms';
                sliderItemsRef.current.style.transform = `translateX(${0}px)`;
                sliderItemsRef.current.childNodes.forEach((el) => {
                    el.style.transform = 'translateX(0)';
                });
                setItemCounter(0);
                setTranslateWidth(0);
            }, 500);
        } else {
            setItemCounter(itemCounter + 1);
        }
    };

    const handleSetStartTouchPosition = (e) =>
        (startTouchPosition.current = e.changedTouches[0].clientX);

    const handleNextSlideByMove = (e) => {
        if (!startTouchPosition.current) return;

        const currentTouchPosition = e.changedTouches[0].clientX;
        const direction = startTouchPosition.current - currentTouchPosition;

        if (direction > 10) {
            handleNextSlide();
        }
        if (direction < -10) {
            handlePrevSlide();
        }
        startTouchPosition.current = null;
    };

    useEffect(() => {
        const slider = sliderRef.current;

        const sliderOnOff = (entries) => {
            if (entries[0].contentRect.width - 154 * itemCount < -15) {
                !sliderOn && setSliderOn(true);
            } else if (entries[0].contentRect.width > 154 * itemCount) {
                sliderOn && setSliderOn(false);
            }
        };

        const resizeObserver = new ResizeObserver(sliderOnOff);

        if (slider) resizeObserver.observe(slider);

        return () => {
            if (slider) resizeObserver.unobserve(slider);
        };
    }, [itemCount, sliderOn]);

    return (
        <div className="popular-songs">
            {!showAllItems && (
                <div className="popular-songs__top">
                    <h2 className="popular-songs__title">Popular songs</h2>
                    <Link
                        to="/songs/popular-songs"
                        className="popular-songs__link-all"
                    >
                        See all
                    </Link>
                </div>
            )}
            {songsLoadingStatus === 'loading' ? (
                <ImSpinner2 className="spinner" />
            ) : songsLoadingStatus === 'error' ? (
                'An error has occurred, reload the page...'
            ) : (
                <div ref={sliderRef} className="popular-songs__slider">
                    {sliderOn && !showAllItems && (
                        <div className="popular-songs__slider-arrows">
                            <button
                                onClick={handlePrevSlide}
                                className="popular-songs__slider-arrow"
                            >
                                prev
                            </button>

                            <button
                                onClick={handleNextSlide}
                                className="popular-songs__slider-arrow"
                            >
                                next{' '}
                            </button>
                        </div>
                    )}
                    <div
                        className={`popular-songs__list ${
                            showAllItems ? 'show-all-items' : ''
                        }`}
                        ref={sliderItemsRef}
                        onTouchMove={handleNextSlideByMove}
                        onTouchStart={handleSetStartTouchPosition}
                    >
                        {renderItems}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PopularSongsList;
