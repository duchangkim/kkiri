import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { readAlbum, unloadAlbum } from "../../modules/album";
import ReadAlbum from "../../components/Album/ReadAlbum";
import { setOriginalAlbum } from "../../modules/album";

const ReadAlbumContainer = ({ match }) => {
  const albumIdx = match.params.idx;
  console.log(match);
  console.log(albumIdx);
  const dispatch = useDispatch();
  const { album, error, loading, member } = useSelector(
    ({ album, loading, member }) => {
      return {
        album: album.album,
        member: member.member,
        error: album.error,
        loading: loading["album/READ_ALBUM"],
      };
    }
  );
  // console.log('44444444');
  // console.dir(album);
  const coupleShareCode = member.coupleShareCode;
  console.log(coupleShareCode);

  useEffect(() => {
    console.log("readalbum girit~~");
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
