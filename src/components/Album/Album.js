import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "./Modal";
import "../../css/album.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Album({ albums, loading, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBasic, setIsBasic] = useState(true);
  const [isWhat, setIsWhat] = useState(false);

  const BUTTON_WRAPPER_STYLES = {
    position: "relative",
    zIndex: 5,
  };

  const Album_ALL = styled.div`
    width: 100%; 
  `
  const Album_LIKE = styled.div`
    width: 100%;
  `

  const onClickALL = () => {
    setIsBasic(true);
    setIsWhat(false);
  }

  const onClickLIKE = () => {
    console.log('눌러')
    setIsBasic(false);
    setIsWhat(true);
  }

  if (error) {
    if (error.response && error.response.status === 404) {
      console.log(error);
      return <>ERROR!</>;
    }
    return <>오류 발생!</>;
  }

  if (albums && !loading) {
    const num = albums.fileData.files.length-1;
    console.log(typeof num);
    return (
      <Row className="main-album m-0 p-0" md={2} sm={1}>
        <Col xl={12} md={12} className="m-0 p-0">
          <div style={BUTTON_WRAPPER_STYLES}>
            <div className="album-title">
              <p className="title-p2">ALBUM</p>
              <p className="title-p3">
                <img
                  src={require("../../images/KakaoTalk_20200923_202130412.png")}
                  alt="사진추가"
                  onClick={() => setIsOpen(true)}
                />
              </p>
              <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
            </div>
          </div>
          <div className='choice'>
            <div onClick={onClickALL}>앨범</div>
            <div onClick={onClickLIKE}>즐겨찾기</div>
            <div>그룹</div>
          </div>
          {isBasic ? <Album_ALL>
          <div className="album-itembox">
            {!loading && albums.fileData.files && (
              <ul className="a-items">
                {albums.fileData.files.reverse().map(
                  (album, index) =>
                    album.filename && (
                      <Link to={`albums/${num-Number(index)}`} key={album.keyid}>
                        <li>
                          <img
                            src={`http://localhost:3000/uploads/${album.filename}`}
                            className="img_place"
                            alt={album.keyid}
                          />                        
                        </li>
                      </Link>
                    )
                )}
              </ul>
            )} 
          </div>
          </Album_ALL> : null }

          {isWhat ? <Album_LIKE>
          <div className="album-itembox">
            {!loading && albums.fileData.files && (
              <ul className="a-items">
                {albums.fileData.files.reverse().map(
                  (album, index) =>
                    album.like === true && (
                      <Link to={`albums/like/${num-Number(index)}`} key={album.keyid}>
                        <li>
                          <img
                            src={`http://localhost:3000/uploads/${album.filename}`}
                            className="img_place"
                            alt={album.keyid}
                          />                        
                        </li>
                      </Link>
                    )
                )}
              </ul>
            )}
          </div>
          </Album_LIKE> : null }
        </Col>
      </Row>
    );
  }
}

export default React.memo(Album);
