import supabase from '../../supabaseClient';
import {
    setAddAlertText,
    setAddAlertType,
} from '../components/Alert/store/alertSlice';
import {
    setAddFavoriteAlbum,
    setAddFavoriteArtist,
    setAddFavoriteSongs,
    setDeleteFavoriteAlbum,
    setDeleteFavoriteArtist,
    setDeleteFavoriteSong,
} from '../components/UserCollection/store/userCollectionSlice';

const addOrDeleteFavoriteItem = (
    dispatch,
    isFavorite,
    data,
    userInfo,
    itemType
) => {
    const { id, email } = userInfo;

    const addFavoriteItem = async () => {
        try {
            if (itemType === 'song') {
                dispatch(setAddFavoriteSongs(data));

                const { error } = await supabase
                    .from('favorite_songs')
                    .insert([
                        {
                            song_id: data.song_id,
                            user_id: id,
                            user_email: email,
                        },
                    ])
                    .select();

                if (error) {
                    dispatch(setAddAlertText(error.message));
                    dispatch(setAddAlertType('error'));
                }
            }

            if (itemType === 'artist') {
                dispatch(setAddFavoriteArtist(data));

                const { error } = await supabase
                    .from('favorite_artists')
                    .insert([
                        {
                            artist_id: data.artist_id,
                            user_id: id,
                            user_email: email,
                        },
                    ])
                    .select();

                if (error) {
                    dispatch(setAddAlertText(error.message));
                    dispatch(setAddAlertType('error'));
                }
            }

            if (itemType === 'album') {
                dispatch(setAddFavoriteAlbum(data));

                const { error } = await supabase
                    .from('favorite_albums')
                    .insert([
                        {
                            album_id: data.album_id,
                            user_id: id,
                            user_email: email,
                        },
                    ])
                    .select();

                if (error) {
                    dispatch(setAddAlertText(error.message));
                    dispatch(setAddAlertType('error'));
                }
            }
        } catch (error) {
            dispatch(setAddAlertText(error.message));
            dispatch(setAddAlertType('error'));
        }
    };

    const deleteFavoriteItem = async () => {
        try {
            if (itemType === 'song') {
                dispatch(setDeleteFavoriteSong(data.song_id));

                const { error } = await supabase
                    .from('favorite_songs')
                    .delete()
                    .eq('song_id', data.song_id);

                if (error) {
                    dispatch(setAddAlertText(error.message));
                    dispatch(setAddAlertType('error'));
                }
            }

            if (itemType === 'artist') {
                dispatch(setDeleteFavoriteArtist(data.artist_id));

                const { error } = await supabase
                    .from('favorite_artists')
                    .delete()
                    .eq('artist_id', data.artist_id);

                if (error) {
                    dispatch(setAddAlertText(error.message));
                    dispatch(setAddAlertType('error'));
                }
            }

            if (itemType === 'album') {
                dispatch(setDeleteFavoriteAlbum(data.album_id));

                const { error } = await supabase
                    .from('favorite_albums')
                    .delete()
                    .eq('album_id', data.album_id);

                if (error) {
                    dispatch(setAddAlertText(error.message));
                    dispatch(setAddAlertType('error'));
                }
            }
        } catch (error) {
            dispatch(setAddAlertText(error.message));
            dispatch(setAddAlertType('error'));
        }
    };

    isFavorite ? deleteFavoriteItem() : addFavoriteItem();
};

export default addOrDeleteFavoriteItem;
