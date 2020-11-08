import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { listAlbums } from '../../modules/albums';
import Album from '../../components/Album/Album'
import qs from 'qs';

const AlbumContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { albums, error } = useSelector((state) => {
    console.log(state)
    return({
    albums: state.albums.albums,
    error: state.albums.error,
  })})
  console.log("ASDASDASD" + albums);

  useEffect(() => {
    const { filename, publishedDate } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listAlbums({ filename, publishedDate }));
  }, [dispatch, location.search])

  return <Album 
            albums={albums} 
            error={error}
          />;
};

export default withRouter(AlbumContainer);
