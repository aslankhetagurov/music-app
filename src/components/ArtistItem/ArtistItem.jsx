import { Link } from 'react-router-dom';

import defaultImg from '../../assets/avatar.png';
import LikeBtn from '../LikeBtn/LikeBtn';
import './ArtistItem.scss';

const ArtistItem = ({ artistData }) => {
    const { name, image } = artistData;
    return (
        <div className="artist">
            <div className="artist__img-wrapper">
                <LikeBtn data={artistData} itemType="artist" />
                <img
                    src={image || defaultImg}
                    className="artist__img"
                    alt={`${name} artist avatar`}
                    width="125"
                    height="125"
                    loading="lazy"
                    decoding="async"
                />
            </div>
            <Link
                className="artist__name"
                to={`/artists/${name}/songs`}
                aria-label={`View all songs by ${name}`}
            >
                {name}
            </Link>
        </div>
    );
};

export default ArtistItem;
