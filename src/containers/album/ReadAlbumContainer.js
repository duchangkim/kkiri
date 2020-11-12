import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readAlbum, unloadAlbum } from '../../modules/album';
import ReadAlbum from '../../components/Album/ReadAlbum';

const ReadAlbumContainer = ({ match }) => {
  const albumId  = match.params.id;
  const albumIdx = match.params.idx;
  console.log(match)
  console.log("111111111 : " + albumId);
  console.log("111111111 : " + albumIdx);
  const dispatch = useDispatch();
  const { albums, error, loading } = useSelector(({ albums, loading }) => {
    return({
      albums: albums.albums,
      loading: loading['album/READ_ALBUM']
    })
  });
  console.log("!!!!!!!readalbum"+albums);
  console.dir(albums);

  useEffect(() => {
    console.log('readalbum!!!!!!!!!!!')
    dispatch(readAlbum(albumId, albumIdx));
    return () => {
      dispatch(unloadAlbum());
    }
  }, [dispatch, albumId, albumIdx])

  return (
    <ReadAlbum    
      albums={albums}
      loading={loading}
      error={error}
      albumId={albumId}
      albumIdx={albumIdx}
    />
  );
};

export default withRouter(ReadAlbumContainer);
