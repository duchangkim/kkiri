import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readAlbum, unloadAlbum } from '../../modules/album';
import ReadAlbum from '../../components/Album/ReadAlbum';

const ReadAlbumContainer = ({ match }) => {
  const albumIdx  = match.params.idx;
  console.log(match);
  console.log(albumIdx);
  const dispatch = useDispatch();
  const { album, error, loading } = useSelector(({ album, loading }) => {
    return({
      album: album.album,
      error: album.error,
      loading: loading['album/READ_ALBUM']
    })
  });
  console.log('44444444');
  console.dir(album);

  useEffect(() => {
    console.log('readalbum girit~~')
    dispatch(readAlbum(albumIdx));
    return () => {
      dispatch(unloadAlbum());
    }
  }, [dispatch, albumIdx]);

  return (
    <ReadAlbum    
      album={album}
      loading={loading}
      error={error}
      albumIdx={albumIdx}
    />
  );
};

export default withRouter(ReadAlbumContainer);
