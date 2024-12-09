import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import CurrentArtistPage from './pages/CurrentArtistPage/CurrentArtistPage';
import CurrentArtistSongslist from './components/CurrentArtistSongsList/CurrentArtistSongsList';
import CurrentArtistAbout from './components/CurrentArtistAbout/CurrentArtistAbout';
import CurrentArtistAlbums from './components/CurrentArtistAlbums/CurrentArtistAlbums';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LogInPage from './pages/LogInPage/LogInPage';
import { setAddUserInfo } from './store/slices/authSlice';
import supabase from '../supabaseClient';
import LoginDataUpdatePage from './pages/LoginDataUpdatePage/LoginDataUpdatePage';
import PasswordRecoveryPage from './pages/PasswordRecoveryPage/PasswordRecoveryPage';
import Alert from './components/Alert/Alert';
import UserCollectionPage from './pages/UserCollectionPage/UserCollectionPage';
import { fetchUserCollection } from './components/UserCollection/store/userCollectionSlice';
import UserCollectionFavoriteSongs from './components/UserCollection/UserCollectionFavoriteSongs/UserCollectionFavoriteSongs';
import UserCollectionFavoriteArtists from './components/UserCollection/UserCollectionFavoriteArtists/UserCollectionFavoriteArtists';
import ListeningHistory from './components/UserCollection/ListeningHistory/ListeningHistory';
import SingleAlbumPage from './pages/SingleAlbumPage/SingleAlbumPage';
import UserCollectionFavoriteAlbums from './components/UserCollection/UserCollectionFavoriteAlbums/UserCollectionFavoriteAlbums';
import {
    setAddAlertText,
    setAddAlertType,
} from './components/Alert/store/alertSlice';
import SingleSongPage from './pages/SingleSongPage/SingleSongPage';
import ChartPage from './pages/ChartPage/ChartPage';
import RegisterPopup from './components/RegisterPopup/RegisterPopup';
import ItemListPageLayout from './layouts/ItemListPageLayout/ItemListPageLayout';
import NewReleasesList from './components/NewReleasesList/NewReleasesList';
import PopularSongsList from './components/PopularSongsList/PopularSongsList';
import RecentlyPlayedList from './components/RecentlyPlayedList/RecentlyPlayedList';
import PopularArtistsList from './components/PopularArtistsList/PopularArtistsList';
import RecommendedSongsList from './components/RecommendedSongsList/RecommendedSongsList';
import PopularAlbumsList from './components/PopularAlbumsList/PopularAlbumsList';
import './App.scss';

function App() {
    const dispatch = useDispatch();

    useEffect(
        () => {
            supabase.auth.onAuthStateChange((event, session) => {
                try {
                    if (session && event === 'INITIAL_SESSION') {
                        (async () => {
                            const { data: userInfo, error } = await supabase
                                .from('users')
                                .select('*')
                                .eq('id', session.user.id);

                            if (error) {
                                dispatch(
                                    setAddAlertText(
                                        `Failed to load user data;
                            ${error.message}`
                                    )
                                );

                                dispatch(setAddAlertType('error'));
                            }

                            if (userInfo) {
                                dispatch(
                                    setAddUserInfo({
                                        ...session.user,
                                        ...userInfo[0],
                                    })
                                );
                            }
                        })();
                        dispatch(fetchUserCollection(session.user.email));
                    }
                } catch (error) {
                    dispatch(
                        setAddAlertText(
                            `Failed to load user data;
                            ${error.message}`
                        )
                    );
                    dispatch(setAddAlertType('error'));
                }
            });
        }, // eslint-disable-next-line
        []
    );

    return (
        <BrowserRouter>
            <div className="app">
                <Alert />
                <RegisterPopup />
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                        <Route
                            path="songs/new-releases"
                            element={
                                <ItemListPageLayout
                                    Component={NewReleasesList}
                                />
                            }
                        />
                        <Route
                            path="songs/popular-songs"
                            element={
                                <ItemListPageLayout
                                    Component={PopularSongsList}
                                />
                            }
                        />
                        <Route
                            path="songs/recently-played"
                            element={
                                <ItemListPageLayout
                                    Component={RecentlyPlayedList}
                                />
                            }
                        />
                        <Route
                            path="artists/popular-artists"
                            element={
                                <ItemListPageLayout
                                    Component={PopularArtistsList}
                                />
                            }
                        />
                        <Route
                            path="songs/recommended-songs"
                            element={
                                <ItemListPageLayout
                                    Component={RecommendedSongsList}
                                />
                            }
                        />
                        <Route
                            path="albums/popular-albums"
                            element={
                                <ItemListPageLayout
                                    Component={PopularAlbumsList}
                                />
                            }
                        />
                        <Route path="songs/chart" element={<ChartPage />} />
                        <Route
                            path="artists/:artistName"
                            element={<CurrentArtistPage />}
                        >
                            <Route
                                path="songs"
                                element={<CurrentArtistSongslist />}
                            ></Route>
                            <Route
                                path="albums"
                                element={<CurrentArtistAlbums />}
                            ></Route>
                            <Route
                                path="about"
                                element={<CurrentArtistAbout />}
                            ></Route>
                        </Route>
                        <Route
                            path="users/:userId"
                            element={<UserCollectionPage />}
                        >
                            <Route
                                path="favorite-songs"
                                element={<UserCollectionFavoriteSongs />}
                            ></Route>
                            <Route
                                path="favorite-artists"
                                element={<UserCollectionFavoriteArtists />}
                            ></Route>
                            <Route
                                path="favorite-albums"
                                element={<UserCollectionFavoriteAlbums />}
                            ></Route>
                            <Route
                                path="listening-history"
                                element={<ListeningHistory />}
                            ></Route>
                        </Route>
                        <Route
                            path="albums/:albumId"
                            element={<SingleAlbumPage />}
                        />
                        <Route
                            path="songs/:songId"
                            element={<SingleSongPage />}
                        />

                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/login" element={<LogInPage />} />
                    <Route path="/recover" element={<PasswordRecoveryPage />} />
                    <Route
                        path="/profile/update"
                        element={<LoginDataUpdatePage />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
