import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { listAlbums } from '../../modules/albums';
import Album from '../../components/Album/Album';

const AlbumContainer = () => {
  const dispatch = useDispatch();
  const { albums, album, error, loading } = useSelector(({ albums, album, loading }) => {
    return({
    albums: albums.albums,
    album: albums.album,
    error: albums.error,
    loading: loading['albums/ALBUM_LISTS']
  })})
  console.log("1111111tlqkf!!" + albums);

  useEffect(() => {
    console.log('리스트 불러옴!!!!!!!!!!!')
    dispatch(listAlbums());
  }, [dispatch])

  return (
    <Album 
      albums={albums}
      album={album} 
      error={error}
      loading={loading}
    />
  );
};

export default withRouter(AlbumContainer);
