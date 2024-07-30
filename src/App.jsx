import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import SongsPage from './pages/SongsPage/SongsPage';
import ArtistsPage from './pages/ArtistsPage/ArtistsPage';
import AlbumsPage from './pages/AlbumsPage/AlbumsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import PopularArtistsPage from './pages/PopularArtistsPage/PopularArtistsPage';
import CurrentArtistPage from './pages/CurrentArtistPage/CurrentArtistPage';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="songs" element={<SongsPage />} />
                        <Route path="artists" element={<ArtistsPage />} />
                        <Route
                            path="artists/popularArtists"
                            element={<PopularArtistsPage />}
                        />
                        <Route
                            path="/artists/:artistName/"
                            element={<CurrentArtistPage />}
                        />
                        <Route path="albums" element={<AlbumsPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
