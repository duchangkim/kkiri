import React from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import "../../css/album.css";

/* ------------------------------------우측 ------------------------------ */
const RightMainStyle = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 16px;
  /* 우측 슬라이더, 캘린더, 앨범 전체 Div */
  .Right-Main {
    width: 100%;
    height: 100%;
    background-color: rgba(244, 245, 249, 1);
  }
  /* 우측 슬라이더 부분 */
  .Krikri-Mall {
    width: 94%;
    height: 27vh;
    position: relative;
    top: 0%;
    margin: 0 auto;
    display: flex;
    /* margin-left: 28px; */
  }
`;

function Popup_Open() {
  document.getElementById("Background-Choice").style.display = "block";
}

function Album() {
  return (
    <Row className="main-album m-0 p-0" md={2} sm={1}>
      <Col xl={12} md={12} className="m-0 p-0">
        <div className="album-title">
          <p className="title-p2">ALBUM</p>
          <p className="title-p3">
            <img
              src={require("../../images/KakaoTalk_20200923_202130412.png")}
            />
          </p>
        </div>
        <div className="album-itembox">
          <ul className="a-items">
            <li>
              <img
                src={require("../../images/pic2.jpg")}
                className="img_place"
              />
            </li>
            <li>
              <img
                src={require("../../images/pic3.jpg")}
                className="img_place"
              />
            </li>
            <li>
              <img
                src={require("../../images/pic4.jpg")}
                className="img_place"
              />
            </li>
          </ul>
        </div>
        {/* <!-- 전체 사이즈 팝업--> *
            <div className="popup-mask"></div>
            {/* <!-- 사진 추가 팝업 --> */}
        <div className="album-popup">
          <div className="pop-title">
            <div className="pt1">사진추가</div>
            <div className="pt2">
              <img
                src={require("../../images/KakaoTalk_20200923_202130412.png")}
                className="img_place"
              />
            </div>
          </div>
          <div className="pop-add"></div>
          <div className="pop-txt">
            <input type="text" placeholder="내용을 입력하세연"></input>
          </div>
          <div className="pop-btn">
            <button>저장하기</button>
          </div>
        </div>
        {/* <!-- 사진 추가 팝업 끗 --> */}
        {/* <!-- 사진 클릭시 팝업 --> */}
        <div className="pic-popup">
          <div className="pic-header">
            <div className="pic-d1">CONTENT : ~</div>
            <div className="pic-d2">
              <img
                src={require("../../images/KakaoTalk_20200923_202130412.png")}
              />
              <img
                src={require("../../images/KakaoTalk_20200923_202130412.png")}
              />
              <img
                src={require("../../images/KakaoTalk_20200923_202130412.png")}
                className="d2-exit"
              />
            </div>
          </div>
          <div className="pic-main"></div>
        </div>
        {/* <!-- 사진 클릭시 팝업 끗 --> */}
      </Col>
    </Row>
  );
}

export default Album;
