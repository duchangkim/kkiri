import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from './Modal';
import '../../css/album.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Album({ albums, loading, error, coupleShareCode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBasic, setIsBasic] = useState(true);
  const [isWhat, setIsWhat] = useState(false);
  const [isVideo, setIsVideo] = useState(false);

  const BUTTON_WRAPPER_STYLES = {
    position: 'relative',
    zIndex: 5,
  };

  const AlbumALL = styled.div`
    width: 100%;
  `;
  const AlbumLike = styled.div`
    width: 100%;
  `;
  const AlbumVideo = styled.div`
    width: 100%;
  `;

  const onClickALL = () => {
    setIsBasic(true);
    setIsWhat(false);
    setIsVideo(false);
  };

  const onClickLIKE = () => {
    setIsBasic(false);
    setIsWhat(true);
    setIsVideo(false);
  };

  const onClickVIDEO = () => {
    setIsBasic(false);
    setIsWhat(false);
    setIsVideo(true);
  };

  if (error) {
    if (error.response && error.response.status === 404) {
      return <>ERROR!</>;
    }
    return <>오류 발생!</>;
  }

  if (albums && !loading) {
    const num = albums.length - 1;

    let arr1 = [];
    let arr2 = [];
    albums.map((file, index) => {
      const extens = file.filename.split('.').pop().toLowerCase();
      if (file.like === true) {
        arr1 = arr1.concat({
          id: index,
          keyid: file.keyid,
          filename: file.filename,
          like: file.like,
        });
      }
      if (
        (extens === 'mp4') |
        (extens === 'm4v') |
        (extens === 'avi') |
        (extens === 'flv') |
        (extens === 'mkv') |
        (extens === 'mov')
      ) {
        arr2 = arr2.concat({
          id: index,
          keyid: file.keyid,
          filename: file.filename,
          like: file.like,
        });
      }
    });

    return (
      <Row className="main-album m-0 p-0" md={2} sm={1}>
        <Col xl={12} md={12} className="m-0 p-0">
          <div style={BUTTON_WRAPPER_STYLES}>
            <div className="album-title">
              <p className="title-p2">ALBUM</p>
              <p className="title-p3">
                <img
                  src={require('../../images/KakaoTalk_20200923_202130412.png')}
                  alt="사진추가"
                  onClick={() => setIsOpen(true)}
                />
              </p>
              <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
            </div>
          </div>
          <div className="choice">
            <div onClick={onClickALL}>앨범</div>
            <div onClick={onClickVIDEO}>동영상</div>
            <div onClick={onClickLIKE}>즐겨찾기</div>
          </div>

          {isBasic ? (
            <AlbumALL>
              <div className="album-itembox">
                {!loading && albums && (
                  <ul className="a-items">
                    {albums.map(
                      (album, index) =>
                        album.filename &&
                        ((album.filename.split('.').pop().toLowerCase() ===
                          'png') |
                        (album.filename.split('.').pop().toLowerCase() ===
                          'jpg') |
                        (album.filename.split('.').pop().toLowerCase() ===
                          'jfif') |
                        (album.filename.split('.').pop().toLowerCase() ===
                          'gif') |
                        (album.filename.split('.').pop().toLowerCase() ===
                          'bmp') |
                        (album.filename.split('.').pop().toLowerCase() ===
                          'jpeg') |
                        (album.filename.split('.').pop().toLowerCase() ===
                          'tiff') ? (
                          <Link
                            to={`albums/${num - Number(index)}`}
                            key={album.keyid}
                          >
                            <li>
                              <img
                                src={`http://localhost:3000/uploads/${coupleShareCode}/${album.filename}`}
                                className="img_place"
                                alt={album.keyid}
                              />
                            </li>
                          </Link>
                        ) : (
                          <Link
                            to={`albums/${num - Number(index)}`}
                            key={album.keyid}
                          >
                            <li>
                              <video
                                src={`http://localhost:3000/uploads/${coupleShareCode}/${album.filename}`}
                                className="img_place"
                                alt={album.keyid}
                                // autoPlay
                              />
                            </li>
                          </Link>
                        ))
                    )}
                  </ul>
                )}
              </div>
            </AlbumALL>
          ) : null}

          {isWhat ? (
            <AlbumLike>
              <div className="album-itembox">
                {!loading && albums && (
                  <ul className="a-items">
                    {arr1.map(
                      (ar, index) =>
                        ar.filename &&
                        ((ar.filename.split('.').pop().toLowerCase() ===
                          'png') |
                        (ar.filename.split('.').pop().toLowerCase() === 'jpg') |
                        (ar.filename.split('.').pop().toLowerCase() ===
                          'jfif') |
                        (ar.filename.split('.').pop().toLowerCase() === 'gif') |
                        (ar.filename.split('.').pop().toLowerCase() === 'bmp') |
                        (ar.filename.split('.').pop().toLowerCase() ===
                          'jpeg') |
                        (ar.filename.split('.').pop().toLowerCase() ===
                          'tiff') ? (
                          <Link to={`albums/like/${index}`} key={ar.keyid}>
                            <li>
                              <img
                                src={`http://localhost:3000/uploads/${coupleShareCode}/${ar.filename}`}
                                className="img_place"
                                alt={ar.keyid}
                              />
                            </li>
                          </Link>
                        ) : (
                          <Link
                            to={`albums/${num - Number(index)}`}
                            key={ar.keyid}
                          >
                            <li>
                              <video
                                src={`http://localhost:3000/uploads/${coupleShareCode}/${ar.filename}`}
                                className="img_place"
                                alt={ar.keyid}
                                // autoPlay
                              />
                            </li>
                          </Link>
                        ))
                    )}
                  </ul>
                )}
              </div>
            </AlbumLike>
          ) : null}

          {isVideo ? (
            <AlbumVideo>
              <div className="album-itembox">
                {!loading && albums && (
                  <ul className="a-items">
                    {arr2.map((ar, index) => (
                      <Link to={`albums/video/${index}`} key={ar.keyid}>
                        <li>
                          <video
                            src={`http://localhost:3000/uploads/${coupleShareCode}/${ar.filename}`}
                            className="img_place"
                            alt={ar.keyid}
                            // autoPlay
                          />
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </div>
            </AlbumVideo>
          ) : null}
        </Col>
      </Row>
    );
  }
}

export default React.memo(Album);
