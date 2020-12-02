import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readAlbum, unloadAlbum } from '../../modules/album';
import VideoReadAlbum from '../../components/Album/VideoReadAlbum';

const VideoReadAlbumContainer = ({ match }) => {
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

  useEffect(() => {
    dispatch(readAlbum(albumIdx));
    return () => {
      dispatch(unloadAlbum());
    };
  }, [dispatch, albumIdx]);

  const coupleShareCode = member.coupleShareCode;

  return (
    <VideoReadAlbum
      album={album}
      loading={loading}
      error={error}
      albumIdx={albumIdx}
      coupleShareCode={coupleShareCode}
    />
  );
};

export default withRouter(VideoReadAlbumContainer);
