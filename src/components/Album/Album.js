import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "./Modal";
import '../../css/album.css';

function Album() {
  const [isOpen, setIsOpen] = useState(false);

  const BUTTON_WRAPPER_STYLES = {
    position: 'relative',
    zIndex: 1
  }
  
  return (
    <Row className="main-album m-0 p-0" md={2} sm={1}>
      <Col xl={12} md={12} className="m-0 p-0">
        <div style={BUTTON_WRAPPER_STYLES}>
          <div className="album-title">
            <p className="title-p2">ALBUM</p>
            <p className="title-p3"><img src={require("../../images/al4.png")} alt="사진추가" onClick={() => setIsOpen(true)}/></p>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            </Modal>
          </div>
        </div>
        <div className="album-itembox">
          <ul className="a-items">
              <li>
                <img src={require("../../images/al2.png")} className='img_place' alt="ex1"/>
              </li>
              <li>
                <img src={require("../../images/al3.png")} className='img_place' alt="ex2"/>
              </li>
          </ul>
        </div>
      </Col>
    </Row> 
  );
}
                    

export default React.memo(Album);
