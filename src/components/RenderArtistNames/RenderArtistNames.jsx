import { Link } from 'react-router-dom';

import './RenderArtistNames.scss';

const RenderArtistNames = ({ names, lineClamp }) => {
    return (
        <div
            className={`song-artist-name__items ${
                lineClamp ? 'song-artist-name__line-clamp' : ''
            }`}
        >
            {names.map((artistName, id) => (
                <Link
                    className="song-artist-name__item"
                    to={`/artists/${artistName}/songs`}
                    key={id}
                >
                    {artistName}
                </Link>
            ))}
        </div>
    );
};

export default RenderArtistNames;
