import supabase from '../../supabaseClient';
import {
    setAddAlertText,
    setAddAlertType,
} from '../components/Alert/store/alertSlice';
import {
    setAddFavoriteSongs,
    setDeleteFavoriteSong,
} from '../components/UserCollection/store/userCollectionSlice';
import store from '../store';

const addOrDeleteFavoriteSong = (isFavoriteSong, songData, userInfo) => {
    const { song_id } = songData;
    const { id, email } = userInfo;

    const addFavoriteSong = async () => {
        try {
            store.dispatch(setAddFavoriteSongs(songData));

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
                store.dispatch(setAddAlertText(error.message));
                store.dispatch(setAddAlertType('error'));
            }
        } catch (error) {
            store.dispatch(setAddAlertText(error.message));
            store.dispatch(setAddAlertType('error'));
        }
    };

    const deleteFavoriteSong = async () => {
        try {
            store.dispatch(setDeleteFavoriteSong(songData.song_id));

            const { error } = await supabase
                .from('favorite_songs')
                .delete()
                .eq('song_id', songData.song_id);

            if (error) {
                store.dispatch(setAddAlertText(error.message));
                store.dispatch(setAddAlertType('error'));
            }
        } catch (error) {
            store.dispatch(setAddAlertText(error.message));
            store.dispatch(setAddAlertType('error'));
        }
    };

    isFavoriteSong ? deleteFavoriteSong() : addFavoriteSong();
};

export default addOrDeleteFavoriteSong;
