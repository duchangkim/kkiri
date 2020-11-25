import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { listAlbums } from '../../modules/albums';
import Album from '../../components/Album/Album';

const AlbumContainer = () => {
  const dispatch = useDispatch();
  const { albums, album, error, loading, member } = useSelector(({ albums, album, loading, member }) => {
    return({
    albums: albums.albums,
    album: albums.album,
    member: member.member,
    error: albums.error,
    loading: loading['albums/ALBUM_LISTS']
  })})
  console.log('여긴 albumcontainer');
  console.dir(albums);

  useEffect(() => {
    console.log('리스트 불러옴!!!!!!!!!!!')
    dispatch(listAlbums());
  }, [dispatch])

  const coupleShareCode = member.coupleShareCode;

  return (
    <Album 
      albums={albums}
      album={album} 
      error={error}
      loading={loading}
      coupleShareCode={coupleShareCode}
    />
  );
};

export default withRouter(AlbumContainer);
