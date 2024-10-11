import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import SongsPage from './pages/SongsPage/SongsPage';
import ArtistsPage from './pages/ArtistsPage/ArtistsPage';
import AlbumsPage from './pages/AlbumsPage/AlbumsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import PopularArtistsPage from './pages/PopularArtistsPage/PopularArtistsPage';
import CurrentArtistPage from './pages/CurrentArtistPage/CurrentArtistPage';
import CurrentArtistSongslist from './components/CurrentArtistSongsList/CurrentArtistSongsList';
import CurrentArtistAbout from './components/CurrentArtistAbout/CurrentArtistAbout';
import CurrentArtistAlbums from './components/CurrentArtistAlbums/CurrentArtistAlbums';
import PopularSongsPage from './pages/PopularSongsPage/PopularSongsPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LogInPage from './pages/LogInPage/LogInPage';
import { setAddUserInfo } from './store/slices/authSlice';
import supabase from '../supabaseClient';
import LoginDataUpdatePage from './pages/LoginDataUpdatePage/LoginDataUpdatePage';
import PasswordRecoveryPage from './pages/PasswordRecoveryPage/PasswordRecoveryPage';
import Alert from './components/Alert/Alert';
import RecentlyPlayedPage from './pages/RecentlyPlayedPage/RecentlyPlayedPage';
import UserCollectionPage from './pages/UserCollectionPage/UserCollectionPage';
import { fetchUserCollection } from './components/UserCollection/store/userCollectionSlice';
import UserCollectionFavoriteSongs from './components/UserCollection/UserCollectionFavoriteSongs/UserCollectionFavoriteSongs';
import UserCollectionFavoriteArtists from './components/UserCollection/UserCollectionFavoriteArtists/UserCollectionFavoriteArtists';
import ListeningHistory from './components/UserCollection/ListeningHistory/ListeningHistory';
import PopularAlbumsPage from './pages/PopularAlbumsPage/PopularAlbumsPage';
import SingleAlbumPage from './pages/SingleAlbumPage/SingleAlbumPage';
import UserCollectionFavoriteAlbums from './components/UserCollection/UserCollectionFavoriteAlbums/UserCollectionFavoriteAlbums';
import './App.scss';

function App() {
    const dispatch = useDispatch();

    useEffect(
        () => {
            supabase.auth.onAuthStateChange((event, session) => {
                if (session && event === 'INITIAL_SESSION') {
                    dispatch(setAddUserInfo(session.user));
                    dispatch(fetchUserCollection(session.user.email));
                }
            });
        }, // eslint-disable-next-line
        []
    );

    return (
        <BrowserRouter>
            <div className="app">
                <Alert />
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="songs" element={<SongsPage />} />
                        <Route
                            path="songs/popular-songs"
                            element={<PopularSongsPage />}
                        />
                        <Route
                            path="songs/recently-played"
                            element={<RecentlyPlayedPage />}
                        />
                        <Route path="artists" element={<ArtistsPage />} />
                        <Route
                            path="artists/popular-artists"
                            element={<PopularArtistsPage />}
                        />
                        <Route
                            path="/artists/:artistName"
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
                            path="/users/:userId"
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
                        <Route path="albums" element={<AlbumsPage />} />
                        <Route
                            path="albums/popular-albums"
                            element={<PopularAlbumsPage />}
                        />
                        <Route
                            path="albums/:albumId"
                            element={<SingleAlbumPage />}
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
