import supabase from '../../supabaseClient';
import {
    setAddAlertText,
    setAddAlertType,
} from '../components/Alert/store/alertSlice';
import {
    setAddFavoriteArtist,
    setAddFavoriteSongs,
    setDeleteFavoriteArtist,
    setDeleteFavoriteSong,
} from '../components/UserCollection/store/userCollectionSlice';
import store from '../store';

const addOrDeleteFavoriteItem = (isFavorite, data, userInfo, itemType) => {
    const { id, email } = userInfo;
    const isSong = itemType === 'song';

    const addFavoriteItem = async () => {
        try {
            isSong
                ? store.dispatch(setAddFavoriteSongs(data))
                : store.dispatch(setAddFavoriteArtist(data));

            const { error } = isSong
                ? await supabase
                      .from('favorite_songs')
                      .insert([
                          {
                              song_id: data.song_id,
                              user_id: id,
                              user_email: email,
                          },
                      ])
                      .select()
                : await supabase
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
                store.dispatch(setAddAlertText(error.message));
                store.dispatch(setAddAlertType('error'));
            }
        } catch (error) {
            store.dispatch(setAddAlertText(error.message));
            store.dispatch(setAddAlertType('error'));
        }
    };

    const deleteFavoriteItem = async () => {
        try {
            isSong
                ? store.dispatch(setDeleteFavoriteSong(data.song_id))
                : store.dispatch(setDeleteFavoriteArtist(data.artist_id));

            const { error } = isSong
                ? await supabase
                      .from('favorite_songs')
                      .delete()
                      .eq('song_id', data.song_id)
                : await supabase
                      .from('favorite_artists')
                      .delete()
                      .eq('artist_id', data.artist_id);

            if (error) {
                store.dispatch(setAddAlertText(error.message));
                store.dispatch(setAddAlertType('error'));
            }
        } catch (error) {
            store.dispatch(setAddAlertText(error.message));
            store.dispatch(setAddAlertType('error'));
        }
    };

    isFavorite ? deleteFavoriteItem() : addFavoriteItem();
};

export default addOrDeleteFavoriteItem;
