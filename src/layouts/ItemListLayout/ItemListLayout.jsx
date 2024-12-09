import { Link } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';

import Slider from '../../components/Slider/Slider';
import './ItemListLayout.scss';

const ItemListLayout = ({
    showAllItems,
    loadingStatus,
    items,
    title,
    linkToAll,
}) => {
    return (
        <div className="item-list-layout">
            <div className="item-list-layout__top">
                <h2 className="item-list-layout__title">{title}</h2>
                {!showAllItems && (
                    <Link to={linkToAll} className="item-list-layout__link-all">
                        See all
                    </Link>
                )}
            </div>
            {loadingStatus === 'loading' ? (
                <ImSpinner2 className="spinner" />
            ) : loadingStatus === 'error' ? (
                'An error has occurred, reload the page...'
            ) : (
                <Slider
                    sliderItems={items}
                    showAllItems={showAllItems}
                    duration={500}
                />
            )}
        </div>
    );
};

export default ItemListLayout;
