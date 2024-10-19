import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import supabase from '../../../supabaseClient';
import {
    setAddAlertText,
    setAddAlertType,
} from '../../components/Alert/store/alertSlice';

const initialState = {
    userInfo: null,
    uploadAvatarStatus: null,
};

export const fetchUploadAvatar = createAsyncThunk(
    'auth/fetchUserInfo',
    async (props, thunkAPI) => {
        try {
            const { data: uploadData, error: uploadError } =
                await supabase.storage
                    .from('avatars')
                    .upload(`avatar_${props.userInfo.id}.png`, props.file, {
                        upsert: true,
                    });

            if (uploadError) {
                thunkAPI.dispatch(
                    setAddAlertText(
                        `Failed to upload avatar;
                        ${uploadError.message}`
                    )
                );
                thunkAPI.dispatch(setAddAlertType('error'));

                return thunkAPI.rejectWithValue(uploadError);
            }

            const { data: avatarLink, error: avatarLinkError } =
                await supabase.storage
                    .from('avatars')
                    .createSignedUrl(uploadData.path, 1000000000);

            if (avatarLink) {
                const { error } = await supabase
                    .from('users')
                    .update({ avatar: avatarLink.signedUrl })
                    .eq('id', props.userInfo.id);

                if (error) {
                    thunkAPI.dispatch(
                        setAddAlertText(
                            `Failed to save avatar link; 
                            ${error.message}`
                        )
                    );
                    return thunkAPI.dispatch(setAddAlertType('error'));
                }

                return {
                    ...props.userInfo,
                    avatar: avatarLink.signedUrl,
                };
            }

            if (avatarLinkError) {
                thunkAPI.dispatch(
                    setAddAlertText(
                        `Failed to get avatar link; ${avatarLinkError.message}`
                    )
                );
                thunkAPI.dispatch(setAddAlertType('error'));

                return thunkAPI.rejectWithValue(avatarLinkError);
            }
        } catch (error) {
            thunkAPI.dispatch(
                setAddAlertText(`Failed to upload avatar; ${error.message}`)
            );
            thunkAPI.dispatch(setAddAlertType('error'));

            return thunkAPI.rejectWithValue(error);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAddUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUploadAvatar.pending, (state) => {
            state.uploadAvatarStatus = 'loading';
        });
        builder.addCase(fetchUploadAvatar.fulfilled, (state, action) => {
            state.uploadAvatarStatus = 'idle';
            state.userInfo = action.payload;
        });
        builder.addCase(fetchUploadAvatar.rejected, (state) => {
            state.uploadAvatarStatus = 'error';
        });
    },
});

const { reducer, actions } = authSlice;

export const { setAddUserInfo } = actions;

export const selectUserInfo = (state) => state.auth.userInfo;
export const selectUploadAvatarStatus = (state) =>
    state.auth.uploadAvatarStatus;

export default reducer;
