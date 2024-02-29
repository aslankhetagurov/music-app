import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import SquareSongItem from '../SquareSongItem/SquareSongItem';
import supabase from '../../../supabaseClient';

import './PopularSongsList.scss';

const PopularSongsList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getSongs();
    }, []);

    async function getSongs() {
        const { data } = await supabase.from('music').select();
        setData(data);
    }

    const renderItems = data.map(({ id, ...data }) => (
        <SquareSongItem key={id} songData={data} />
    ));

    return (
        <div className="popular-songs">
            <div className="popular-songs__top">
                <h3 className="popular-songs__title">Popular songs</h3>
                <Link className="popular-songs__link-all">See all</Link>
            </div>
            <div className="popular-songs__list">{renderItems}</div>
        </div>
    );
};

export default PopularSongsList;
