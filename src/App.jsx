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
import './App.scss';

function App() {
    const dispath = useDispatch();

    useEffect(
        () => {
            supabase.auth.onAuthStateChange((_, session) => {
                dispath(setAddUserInfo(session ? session.user : null));
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
                            path="songs/popularSongs"
                            element={<PopularSongsPage />}
                        />
                        <Route path="artists" element={<ArtistsPage />} />
                        <Route
                            path="artists/popularArtists"
                            element={<PopularArtistsPage />}
                        />
                        <Route
                            path="/artists/:artistName/"
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
                        <Route path="albums" element={<AlbumsPage />} />
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
