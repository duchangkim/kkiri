import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as albumsAPI from '../lib/api/album';
import { takeLatest } from 'redux-saga/effects';

const [
    READ_ALBUM,
    READ_ALBUM_SUCCESS,
    READ_ALBUM_FAILURE,
] = createRequestActionTypes('album/READ_ALBUM');
const UNLOAD_ALBUM = 'album/UNLOAD_ALBUM';

export const readAlbum = createAction(READ_ALBUM, (id, idx) => (id, idx));
export const unloadAlbum = createAction(UNLOAD_ALBUM);

console.log("readreadreadreadreadread###");

const readAlbumSaga = createRequestSaga(READ_ALBUM, albumsAPI.readFile);
export function* albumSaga() {
    yield takeLatest(READ_ALBUM, readAlbumSaga);
}

const initialState = {
    album: null,
    error: null,
}

const album = handleActions(
    {
        [READ_ALBUM_SUCCESS]: (state, { payload: album}) => ({
            ...state,
            album,
            error: null,
        }),
        [READ_ALBUM_FAILURE]: (state, { payload: error}) => ({
            ...state,
            error,
        }),
        [UNLOAD_ALBUM]: () => initialState,
    },
    initialState,
);

export default album;