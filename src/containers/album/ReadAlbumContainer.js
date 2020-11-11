import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { listAlbums } from '../../modules/albums';
import ReadAlbum from '../../components/Album/ReadAlbum';

const ReadAlbumContainer = () => {
  const dispatch = useDispatch();
  

//   useEffect(() => {
//     console.log('리스트 불러옴!!!!!!!!!!!')
//     dispatch();
//   }, [dispatch])

  return (
    <ReadAlbum    

    />
  );
};

export default withRouter(ReadAlbumContainer);
