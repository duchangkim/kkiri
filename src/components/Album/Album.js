import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "./Modal";
import "../../css/album.css";

function Album({ albums, loading, error }) {
  
  const [isOpen, setIsOpen] = useState(false);

  const BUTTON_WRAPPER_STYLES = {
    position: "relative",
    zIndex: 1,
  };

  if(error) {
    if(error.response && error.response.status === 404) {
      return <>존재하지 않습니다</>
    }
    return <>오류 발생!</>
  }

  const { filename } = albums;
  console.log("@#@#@#@#@#@ "+ albums);
  
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
        <div className="album-itembox">
          {/* {!loading && albums && (
          <ul className="a-items">
              {albums.map(album => (
              <li>
                <div>파일이름: {filename}</div>
                <img src={require(`../../../server/src/api/album/uploads/${album.filename}`)} 
                className="img_place" alt={album.filename}/>
              </li>
              ))}
          </ul>
          )} */}
        </div>
      </Col>
    </Row>
  );
}

export default React.memo(Album);

