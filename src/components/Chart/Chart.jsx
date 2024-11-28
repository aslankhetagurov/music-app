import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';

import handleAddCurrentSongsList from '../../utils/handleAddCurrentSongsList';
import LineSongItem from '../LineSongItem/LineSongItem';
import {
    fetchChartList,
    selectChartList,
    selectChartListLoadingStatus,
    selectPrevChartList,
} from './store/chartSlice';
import { selectCurrentSongsList } from '../../store/slices/generalStateSlice';
import './Chart.scss';

const Chart = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const currentSongslist = useSelector(selectCurrentSongsList);
    const chartList = useSelector(selectChartList);
    const prevChartList = useSelector(selectPrevChartList);
    const chartListLoadingStatus = useSelector(selectChartListLoadingStatus);
    const showAllItems = pathname === '/songs/chart';

    useEffect(() => {
        dispatch(fetchChartList());
        // eslint-disable-next-line
    }, []);

    const renderLeftItems = () =>
        chartList
            ?.slice()
            .splice(0, 5)
            .map((data, i) => {
                const prevPosition =
                    prevChartList.findIndex(
                        (el) => el.song_id === data.song_id
                    ) + 1;

                return (
                    <LineSongItem
                        key={data.song_id}
                        songData={data}
                        handleAddCurrentList={() =>
                            handleAddCurrentSongsList(
                                currentSongslist,
                                chartList
                            )
                        }
                        songNum={i + 1}
                        prevPosition={prevPosition}
                    />
                );
            });

    const renderRightItems = () =>
        chartList
            ?.slice()
            .splice(5, 5)
            .map((data, i) => {
                const prevPosition =
                    prevChartList.findIndex(
                        (el) => el.song_id === data.song_id
                    ) + 1;

                return (
                    <LineSongItem
                        key={data.song_id}
                        songData={data}
                        handleAddCurrentList={() =>
                            handleAddCurrentSongsList(
                                currentSongslist,
                                chartList
                            )
                        }
                        songNum={i + 6}
                        prevPosition={prevPosition}
                    />
                );
            });

    const renderAllItems = () =>
        chartList?.map((data, i) => {
            const prevPosition =
                prevChartList.findIndex((el) => el.song_id === data.song_id) +
                1;

            return (
                <LineSongItem
                    key={data.song_id}
                    songData={data}
                    handleAddCurrentList={() =>
                        handleAddCurrentSongsList(currentSongslist, chartList)
                    }
                    songNum={i + 1}
                    prevPosition={prevPosition}
                />
            );
        });

    return (
        <div className="chart">
            <div className="chart__header">
                <div className="chart__header-top">
                    <h1 className="chart__title">Chart</h1>
                    {!showAllItems && (
                        <Link className="chart__link-all" to="/songs/chart">
                            See all
                        </Link>
                    )}
                </div>
                <h4 className="chart__subtitle">
                    The most popular songs based on the number of plays
                </h4>
            </div>

            {chartListLoadingStatus === 'loading' ? (
                <ImSpinner2 className="spinner" />
            ) : chartListLoadingStatus === 'error' ? (
                'An error has occurred, reload the page...'
            ) : (
                <div
                    className={`chart__list ${
                        showAllItems ? 'chart__list-all' : ''
                    }`}
                >
                    {showAllItems ? (
                        renderAllItems()
                    ) : (
                        <>
                            <div className="chart__list-left">
                                {renderLeftItems()}
                            </div>
                            <div className="chart__list-right">
                                {renderRightItems()}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Chart;
