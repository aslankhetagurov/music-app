import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import MainLayout from './layouts/MainLayout';
import Alert from './components/Alert/Alert';
import RegisterPopup from './components/RegisterPopup/RegisterPopup';
import { setAddUserInfo } from './store/slices/authSlice';
import { fetchUserCollection } from './components/UserCollection/store/userCollectionSlice';
import {
    setAddAlertText,
    setAddAlertType,
} from './components/Alert/store/alertSlice';
import supabase from '../supabaseClient';
import HomePage from './pages/HomePage/HomePage';
import AppLoader from './components/AppLoader/AppLoader';
import './App.scss';

const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const CurrentArtistPage = lazy(
    () => import('./pages/CurrentArtistPage/CurrentArtistPage')
);
const CurrentArtistSongslist = lazy(
    () => import('./components/CurrentArtistSongsList/CurrentArtistSongsList')
);
const CurrentArtistAbout = lazy(
    () => import('./components/CurrentArtistAbout/CurrentArtistAbout')
);
const CurrentArtistAlbums = lazy(
    () => import('./components/CurrentArtistAlbums/CurrentArtistAlbums')
);
const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage'));
const LogInPage = lazy(() => import('./pages/LogInPage/LogInPage'));
const LoginDataUpdatePage = lazy(
    () => import('./pages/LoginDataUpdatePage/LoginDataUpdatePage')
);
const PasswordRecoveryPage = lazy(
    () => import('./pages/PasswordRecoveryPage/PasswordRecoveryPage')
);
const UserCollectionPage = lazy(
    () => import('./pages/UserCollectionPage/UserCollectionPage')
);
const UserCollectionFavoriteSongs = lazy(
    () =>
        import('./components/UserCollection/UserCollectionFavoriteSongs/UserCollectionFavoriteSongs')
);
const UserCollectionFavoriteArtists = lazy(
    () =>
        import('./components/UserCollection/UserCollectionFavoriteArtists/UserCollectionFavoriteArtists')
);
const ListeningHistory = lazy(
    () =>
        import('./components/UserCollection/ListeningHistory/ListeningHistory')
);
const SingleAlbumPage = lazy(
    () => import('./pages/SingleAlbumPage/SingleAlbumPage')
);
const UserCollectionFavoriteAlbums = lazy(
    () =>
        import('./components/UserCollection/UserCollectionFavoriteAlbums/UserCollectionFavoriteAlbums')
);
const SingleSongPage = lazy(
    () => import('./pages/SingleSongPage/SingleSongPage')
);
const ChartPage = lazy(() => import('./pages/ChartPage/ChartPage'));
const ItemListPageLayout = lazy(
    () => import('./layouts/ItemListPageLayout/ItemListPageLayout')
);
const NewReleasesList = lazy(
    () => import('./components/NewReleasesList/NewReleasesList')
);
const PopularSongsList = lazy(
    () => import('./components/PopularSongsList/PopularSongsList')
);
const RecentlyPlayedList = lazy(
    () => import('./components/RecentlyPlayedList/RecentlyPlayedList')
);
const PopularArtistsList = lazy(
    () => import('./components/PopularArtistsList/PopularArtistsList')
);
const RecommendedSongsList = lazy(
    () => import('./components/RecommendedSongsList/RecommendedSongsList')
);
const PopularAlbumsList = lazy(
    () => import('./components/PopularAlbumsList/PopularAlbumsList')
);

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                try {
                    if (session && event === 'INITIAL_SESSION') {
                        const { data: userInfo, error } = await supabase
                            .from('users')
                            .select('*')
                            .eq('id', session.user.id);

                        if (error) {
                            dispatch(
                                setAddAlertText(
                                    `Failed to load user data: ${error.message}`
                                )
                            );
                            dispatch(setAddAlertType('error'));
                            return;
                        }

                        if (userInfo?.length) {
                            dispatch(
                                setAddUserInfo({
                                    ...session.user,
                                    ...userInfo[0],
                                })
                            );
                            dispatch(fetchUserCollection(session.user.email));
                        }
                    }
                } catch (error) {
                    dispatch(
                        setAddAlertText(
                            `Failed to load user data: ${error.message}`
                        )
                    );
                    dispatch(setAddAlertType('error'));
                }
            }
        );

        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, []);

    return (
        <BrowserRouter>
            <div className="app">
                <Alert />
                <RegisterPopup />
                <Suspense fallback={<AppLoader />}>
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
                                />
                                <Route
                                    path="albums"
                                    element={<CurrentArtistAlbums />}
                                />
                                <Route
                                    path="about"
                                    element={<CurrentArtistAbout />}
                                />
                            </Route>
                            <Route
                                path="users/:userId"
                                element={<UserCollectionPage />}
                            >
                                <Route
                                    path="favorite-songs"
                                    element={<UserCollectionFavoriteSongs />}
                                />
                                <Route
                                    path="favorite-artists"
                                    element={<UserCollectionFavoriteArtists />}
                                />
                                <Route
                                    path="favorite-albums"
                                    element={<UserCollectionFavoriteAlbums />}
                                />
                                <Route
                                    path="listening-history"
                                    element={<ListeningHistory />}
                                />
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
                        <Route
                            path="/recover"
                            element={<PasswordRecoveryPage />}
                        />
                        <Route
                            path="/profile/update"
                            element={<LoginDataUpdatePage />}
                        />
                    </Routes>
                </Suspense>
            </div>
        </BrowserRouter>
    );
}

export default App;
