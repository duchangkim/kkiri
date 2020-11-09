import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { listAlbums } from '../../modules/albums';
import Album from '../../components/Album/Album';
import qs from 'qs';

const AlbumContainer = () => {
  const dispatch = useDispatch();
  const { albums, error, loading } = useSelector(({ albums, loading }) => ({
    albums: albums.albums,
    error: albums.error,
    loading: loading['albums/ALBUM_LISTS']
  }))
  console.log("1111111tlqkf!!" + albums);

  useEffect(() => {
    console.log('리스트 불러옴!!!!!!!!!!!tlqkf')
    dispatch(listAlbums());
  }, [dispatch])

  return <Album 
            albums={albums} 
            error={error}
          />;
};

export default withRouter(AlbumContainer);
