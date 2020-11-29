import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as albumsAPI from "../lib/api/album";
import { takeLatest } from "redux-saga/effects";

const [
  READ_ALBUM,
  READ_ALBUM_SUCCESS,
  READ_ALBUM_FAILURE,
] = createRequestActionTypes("album/READ_ALBUM");
const UNLOAD_ALBUM = "album/UNLOAD_ALBUM";
const SET_ORIGINAL_ALBUM = "album/SET_ORIGINAL_ALBUM";

export const readAlbum = createAction(READ_ALBUM, (id, idx) => (id, idx));
console.log("2222222module/album");
export const unloadAlbum = createAction(UNLOAD_ALBUM);

export const setOriginalAlbum = createAction(SET_ORIGINAL_ALBUM, (idx) => idx);

const readAlbumSaga = createRequestSaga(READ_ALBUM, albumsAPI.readFile);
export function* albumSaga() {
  yield takeLatest(READ_ALBUM, readAlbumSaga);
}

const initialState = {
  album: null,
  error: null,
  likes: null,
  originalAlbumId: null,
};

const album = handleActions(
  {
    [READ_ALBUM_SUCCESS]: (state, { payload: album }) => ({
      ...state,
      album,
      error: null,
    }),
    [READ_ALBUM_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_ALBUM]: () => initialState,
    [SET_ORIGINAL_ALBUM]: (state, { payload: album }) => ({
      ...state,
      likes: album.likes,
      originalAlbumId: album.index,
    }),
  },
  initialState
);

export default album;
