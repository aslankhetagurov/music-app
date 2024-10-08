import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';

import {
    fetchSingleAlbum,
    selectSingleAlbumLoadingStatus,
} from './store/singleAlbumSlice';
import SingleAlbumMain from '../../components/SingleAlbum/SingleAlbumMain/SingleAlbumMain';
import SingleAlbumSongsList from '../../components/SingleAlbum/SingleAlbumSongsList/SingleAlbumSongsList';
import './SingleAlbumPage.scss';

const SingleAlbumPage = () => {
    const singlAlbumLoadingStatus = useSelector(selectSingleAlbumLoadingStatus);
    const dispatch = useDispatch();
    const { albumId } = useParams();

    useEffect(
        () => {
            dispatch(fetchSingleAlbum(albumId));
        }, //eslint-disable-next-line
        []
    );

    return singlAlbumLoadingStatus === 'loading' ? (
        <ImSpinner2 className="spinner" />
    ) : singlAlbumLoadingStatus === 'error' ? (
        <h1>An has occurred, reload the page...</h1>
    ) : (
        <div className="single-album-page">
            <SingleAlbumMain />
            <SingleAlbumSongsList />
        </div>
    );
};

export default SingleAlbumPage;
