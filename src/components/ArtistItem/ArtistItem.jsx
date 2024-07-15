import { Link } from 'react-router-dom';
import './ArtistItem.scss';

const ArtistItem = ({ artistData }) => {
    const { name, image } = artistData;
    return (
        <div className="artist">
            <img src={image} className="artist__img"></img>
            <Link className="artist__name">{name}</Link>
        </div>
    );
};

export default ArtistItem;
