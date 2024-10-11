import { Link } from 'react-router-dom';

import LikeBtn from '../LikeBtn/LikeBtn';
import './ArtistItem.scss';

const ArtistItem = ({ artistData }) => {
    const { name, image } = artistData;
    return (
        <div className="artist">
            <div className="artist__img-wrapper">
                <LikeBtn data={artistData} itemType="artist" />
                <img src={image} className="artist__img"></img>
            </div>
            <Link className="artist__name" to={`/artists/${name}/songs`}>
                {name}
            </Link>
        </div>
    );
};

export default ArtistItem;
