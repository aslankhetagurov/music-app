import { Link } from 'react-router-dom';

import './RenderArtistNames.scss';

const RenderArtistNames = ({ names, lineClamp }) => {
    return (
        <div
            className={`artist-name__items ${
                lineClamp ? 'artist-name__line-clamp' : ''
            }`}
        >
            {names.map((artistName, id) => (
                <Link
                    className="artist-name__item"
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
