import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "./Modal";
import "../../css/album.css";
import { Link } from "react-router-dom";

function Album({ albums, loading, error }) {
  const [isOpen, setIsOpen] = useState(false);

  const BUTTON_WRAPPER_STYLES = {
    position: "relative",
    zIndex: 1,
  };

  if (error) {
    if (error.response && error.response.status === 404) {
      console.log(error);
      return <>ERROR!</>;
    }
    return <>오류 발생!</>;
  }
  // console.log('componenttttttttttt');
  // console.dir(albums);

  if (albums) {
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
            {!loading && albums.fileData.files && (
              <ul className="a-items">
                {albums.fileData.files.map(
                  (album, index) =>
                    album.filename && (
                      <Link to={`albums/${index}`} key={index}>
                        <li>
                          <img
                            src={
                              `http://localhost:3000/uploads/${album.filename}`
                                ? `http://localhost:3000/uploads/${album.filename}`
                                : "../../images/error.jpg"
                            }
                            className="img_place"
                            alt={album.idx}
                          />
                        </li>
                      </Link>
                    )
                )}
              </ul>
            )}
          </div>
        </Col>
      </Row>
    );
  }
}

export default React.memo(Album);
