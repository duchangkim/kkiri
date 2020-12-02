import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readAlbum, unloadAlbum } from '../../modules/album';
import ReadAlbum from '../../components/Album/ReadAlbum';

const ReadAlbumContainer = ({ match }) => {
  const albumIdx = match.params.idx;
  const dispatch = useDispatch();
  const { album, error, loading, member } = useSelector(
    ({ album, loading, member }) => {
      return {
        album: album.album,
        member: member.member,
        error: album.error,
        loading: loading['album/READ_ALBUM'],
      };
    }
  );
  const coupleShareCode = member.coupleShareCode;

  useEffect(() => {
    dispatch(readAlbum(albumIdx));
    return () => {
      dispatch(unloadAlbum());
    };
  }, [dispatch, albumIdx]);

  return (
    <ReadAlbum
      album={album}
      loading={loading}
      error={error}
      albumIdx={albumIdx}
      coupleShareCode={coupleShareCode}
    />
  );
};

export default withRouter(ReadAlbumContainer);
