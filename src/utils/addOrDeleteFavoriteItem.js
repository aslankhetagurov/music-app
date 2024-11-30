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
                const { song_id } = data;
                dispatch(setAddFavoriteSongs(data));

                const { error } = await supabase
                    .from('favorite_songs')
                    .insert([
                        {
                            song_id: song_id,
                            user_id: id,
                            user_email: email,
                        },
                    ])
                    .select();

                if (error) {
                    if (error) console.log(error);
                    dispatch(setAddAlertText(error.message));
                    dispatch(setAddAlertType('error'));
                }

                let { error: incrementError } = await supabase.rpc(
                    'increment_song_likes',
                    {
                        row_id: song_id,
                    }
                );
                if (incrementError) {
                    console.log(incrementError);
                    dispatch(setAddAlertText(incrementError.message));
                    dispatch(setAddAlertType('error'));
                }
            }

            if (itemType === 'artist') {
                const { artist_id } = data;
                dispatch(setAddFavoriteArtist(data));

                const { error } = await supabase
                    .from('favorite_artists')
                    .insert([
                        {
                            artist_id: artist_id,
                            user_id: id,
                            user_email: email,
                        },
                    ])
                    .select();

                if (error) {
                    console.log(error);
                    dispatch(setAddAlertText(error.message));
                    dispatch(setAddAlertType('error'));
                }

                let { error: incrementError } = await supabase.rpc(
                    'increment_artist_likes',
                    {
                        row_id: artist_id,
                    }
                );
                if (incrementError) {
                    console.log(incrementError);
                    dispatch(setAddAlertText(incrementError.message));
                    dispatch(setAddAlertType('error'));
                }
            }

            if (itemType === 'album') {
                const { album_id } = data;
                dispatch(setAddFavoriteAlbum(data));

                const { error } = await supabase
                    .from('favorite_albums')
                    .insert([
                        {
                            album_id: album_id,
                            user_id: id,
                            user_email: email,
                        },
                    ])
                    .select();

                if (error) {
                    console.log(error);

                    dispatch(setAddAlertText(error.message));
                    dispatch(setAddAlertType('error'));
                }

                let { error: incrementError } = await supabase.rpc(
                    'increment_album_likes',
                    {
                        row_id: album_id,
                    }
                );
                if (incrementError) {
                    console.log(incrementError);
                    dispatch(setAddAlertText(incrementError.message));
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
                    console.log(error);
                    dispatch(setAddAlertText(error.message));
                    dispatch(setAddAlertType('error'));
                }

                let { error: decrementError } = await supabase.rpc(
                    'decrement_song_likes',
                    {
                        row_id: data.song_id,
                    }
                );
                if (decrementError) {
                    console.log(decrementError);
                    dispatch(setAddAlertText(decrementError.message));
                    dispatch(setAddAlertType('error'));
                }
            }

            if (itemType === 'artist') {
                const { artist_id } = data;
                dispatch(setDeleteFavoriteArtist(data.artist_id));

                const { error } = await supabase
                    .from('favorite_artists')
                    .delete()
                    .eq('artist_id', artist_id);
                if (error) {
                    console.log(error);
                    dispatch(setAddAlertText(error.message));
                    dispatch(setAddAlertType('error'));
                }

                let { error: decrementError } = await supabase.rpc(
                    'decrement_artist_likes',
                    {
                        row_id: artist_id,
                    }
                );
                if (decrementError) {
                    console.log(decrementError);
                    dispatch(setAddAlertText(decrementError.message));
                    dispatch(setAddAlertType('error'));
                }
            }

            if (itemType === 'album') {
                const { album_id } = data;
                dispatch(setDeleteFavoriteAlbum(data.album_id));

                const { error } = await supabase
                    .from('favorite_albums')
                    .delete()
                    .eq('album_id', album_id);
                if (error) {
                    console.log(error);
                    dispatch(setAddAlertText(error.message));
                    dispatch(setAddAlertType('error'));
                }

                let { error: decrementError } = await supabase.rpc(
                    'decrement_album_likes',
                    {
                        row_id: album_id,
                    }
                );
                if (decrementError) {
                    console.log(decrementError);
                    dispatch(setAddAlertText(decrementError.message));
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
