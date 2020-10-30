import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import "../../css/Header.css";

function Header() {
  return (
    <>
      <Col md={5} className="test6 m-0 p-0">
        <div className="Krikri-Select" id="Krikri-Select">
          <form className="Search" id="Search">
            <button
              className="Img-Button"
              id="Img-Button"
              type="submit"
              name="click"
              value=""
            ></button>
            <input
              className="Search-Keyword"
              type="text"
              name="search"
              placeholder="Google 검색"
              autoComplete="off"
            />
          </form>
        </div>
      </Col>
      <Col md={7} className="test6 m-0 p-0">
        <div className="Krikri-Header">
          <div className="Krikri-Name">우리들만의 끼리끼리:）</div>
          <div className="Krikri-Date">20-00-00</div>
          <img
            src={require("../../images/alram.png")}
            alt="알림"
            className="Krikri-Header-Alram"
          />
          <img
            src={require("../../images/profile.png")}
            alt="프로필"
            className="Krikri-Header-Profile"
          />
        </div>
      </Col>
    </>
  );
}

export default Header;
