import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as albumsAPI from '../lib/api/album';
import { takeLatest } from 'redux-saga/effects';

const [
    LIST_ALBUMS,
    LIST_ALBUMS_SUCCESS,
    LIST_ALBUMS_FAILURE,
] = createRequestActionTypes('album/LIST_ALBUMS');

export const listAlbums = createAction(
    LIST_ALBUMS,
    ({ filename }) => ({ filename })
);



const listAlbumsSaga = createRequestSaga(LIST_ALBUMS, albumsAPI.listAlbums);
export function* albumsSaga() {
    yield takeLatest(LIST_ALBUMS, listAlbumsSaga);
}

const initialState = {
    albums: null,
    error: null,
}

const albums = handleActions(
    {
        [LIST_ALBUMS_SUCCESS]: (state, { payload: albums}) => ({
            ...state,
            albums,
        }),
        [LIST_ALBUMS_FAILURE]: (state, { payload: error}) => ({
            ...state,
            error,
        }),
    },
    initialState,
);

export default albums;