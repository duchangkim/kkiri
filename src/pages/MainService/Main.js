import React from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { FcLike } from "react-icons/fc";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPeopleCircle, BsImageFill } from "react-icons/bs";
import Popup from "./Popup";

const LeftMainStyle = styled.div`
  width: 100%;
  height: 100%;
  li {
    list-style: none;
  }
  img {
    object-fit: cover;
  }
  /* 메인 */
  .Left-Main {
    width: 90%;
    height: 88vh;
    margin: 0 auto;
    margin-right: 28px;
  }
  /* 커플 사진 이미지 Div */
  .Krikri-Love {
    width: 100%;
    height: 100%;
    position: relative;
    margin: 0 auto;
    margin-right: 28px;
    border-radius: 20px;
  }
  .Choice-Popup_Close {
    position: relative;
    transform: rotate(45deg);
    left: 40%;
    top: -22px;
    width: 50px;
    height: 40px;
  }
  .Choice-Popup_Close:hover {
    cursor: pointer;
  }
  .Profile-Choice {
    position: absolute;
    z-index: 1000;
    top: 40%;
    left: 80%;
    transform: translateY(-40%);
    width: 400px;
    height: 450px;
    background-color: white;
    border-radius: 10px;
    display: none;
  }
  .Profile-Choice-Title {
    width: 100%;
    height: 15%;
    font-size: 1.4rem;
    text-align: center;
    background-color: rgba(255, 131, 141, 1);
    color: white;
    border-radius: 10px 10px 0px 0px / 10px 10px 0px 0px;
  }
  .Profile-Choice-Title h4 {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .Profile_Close {
    position: relative;
    transform: rotate(45deg);
    left: 40%;
    top: -22px;
    width: 50px;
    height: 40px;
  }
  .Profile_Close:hover {
    cursor: pointer;
  }
  .Profile-Weather {
    width: 100%;
    height: 30%;
    display: flex;
    border-bottom: 1px solid gray;
  }
  .Profile-Weather-Img {
    width: 40%;
    height: 100%;
    border-right: 1px solid gray;
  }
  .Profile-Weather-Img img {
    margin-top: 25%;
    margin-left: 20%;
  }
  .Profile-Weather-Content {
    width: 60%;
    height: 100%;
    padding-top: 2%;
    padding-bottom: 1%;
    padding-left: 10%;
    font-weight: bold;
  }
  .Profile-Weather-Local {
    width: 100%;
    height: 33%;
    margin-top: 5%;
  }
  .Profile-Weather-Description {
    width: 100%;
    height: 33%;
  }
  .Profile-Weather-Temperature {
    width: 100%;
    height: 33%;
  }
  .MyProfile {
    width: 100%;
    height: 55%;
    border-radius: 0px 0px 10px 10px / 0px 0px 10px 10px;
  }
  .ProfileIMG {
    width: 120px;
    height: 100px;
    position: relative;
    top: 10%;
    left: 5%;
    border-radius: 50%;
  }
  .ProfileIMG img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .ProfileContent {
    width: 70%;
    height: 110px;
    position: relative;
    top: 11.5%;
    display: flex;
  }
  .ProfileContent ul {
    margin: 0;
    padding: 0;
    font-size: 16px;
    padding-top: 10px;
  }
  .ProfileContent ul li:first-child {
    font-size: 20px;
    font-weight: bold;
    position: relative;
    left: 10%;
    letter-spacing: 5px;
  }
  .ProfileContent ul li:nth-child(2) {
    position: relative;
    left: 10%;
    margin-top: 10px;
    letter-spacing: 3px;
  }
  .ProfileContent ul li:last-child {
    position: relative;
    left: 10%;
    color: gray;
    font-size: 14px;
    letter-spacing: 3px;
  }
  .ProfileSetting {
    position: relative;
    top: 2%;
    left: 73%;
    width: 100px;
    height: 25px;
    text-align: center;
    justify-content: center;
    border: 1px solid gray;
    align-content: center;
    border-radius: 20px;
  }
  .ProfileSetting:hover {
    cursor: pointer;
  }
  /* --------------------------------- */
  #Background-Option {
    position: relative;
    top: -10px;
    left: 45%;
    width: 80px;
    height: 80px;
  }
  #Background-Option:hover {
    cursor: pointer;
  }

  /* 커플 사진 이미지 사이즈 */
  .Krikri-Love .background-Img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
  /* 커플 사진 텍스트 부분 */
  .Date-Love {
    text-align: center;
    position: relative;
    top: -100%;
  }
  /* 우리함께한지 부분 */
  .Love-Text {
    font-size: 1.5rem;
    margin-bottom: 10px;
    font-weight: bold;
  }
  /* 커플 사진 하트 부분 */
  .Date-Love .Love {
    position: relative;
    top: -65%;
    width: 50px;
    height: 50px;
    margin-bottom: 0px;
  }
  /* 몇일 사귄 날짜 */
  .Date {
    font-size: 2rem;
    font-weight: bold;
  }
  /* 개인 사진 Div */
  .Love-Face {
    width: 100%;
    height: 120px;
    position: relative;
    top: -90%;
    display: flex;
  }
  /* 개인 사진 프로필 Div 부분 */
  .Left-Face,
  .Right-Face {
    width: 50%;
    height: 130px;
    text-align: center;
  }
  /* 개인 사진 프로필 Div 부분 */
  .L-Face,
  .R-Face {
    width: 50%;
    height: 130px;
    margin: 0 auto;
  }
  /* 프로필 부분 */
  .Face {
    width: 100%;
    height: 130px;
  }
  /* 프로필 이미지 부분 */
  .Face img {
    width: 100%;
    height: 130px;
    border-radius: 50%;
  }
  /* 프로필 이름 부분 */
  .Name {
    width: 100%;
    height: 30px;
    font-size: 1.5rem;
    margin-top: 5px;
  }
  /* 날씨 부분 */
  .Krikri-Weather {
    width: 100%;
    position: relative;
    top: -80%;
    height: 25%;
    display: flex;
  }
  /* 좌측 날씨 */
  .Left-Weather {
    width: 50%;
    height: 100%;
  }
  /* 우측 날씨 */
  .Right-Weather {
    width: 50%;
    height: 100%;
  }
  /* 현재 날씨 정보 div */
  .Show-Weather {
    width: 50%;
    height: 100%;
    margin: 0 auto;
    background-color: rgba(236, 226, 226, 0.4);
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    overflow: hidden;
  }
  /* 지역 */
  .Local {
    width: 100%;
    height: 22.5%;
  }
  /* 날씨 이미지 */
  .Weather-Image {
    width: 100%;
    height: 30%;
  }
  /* 날씨 텍스트 */
  .description {
    width: 100%;
    height: 22.5%;
  }
  /* 온도 */
  .temperature {
    width: 100%;
    height: 25%;
  }
  .Love-Text2,
  .Love2,
  .Date2 {
    display: none;
  }
  .LeftName,
  .RightName {
    display: none;
  }
  /* 10-23추가 */
  .Link_To_SideBar {
    width: 100%;
    height: 7%;
    position: relative;
    top: -25%;
    display: none;
  }
  .Link_To_SideBar ul {
    display: flex;
    margin: 0;
    padding: 0;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    height: 100%;
  }
  .Link_To_SideBar ul li {
    width: 50px;
    height: 100%;
    border-radius: 50%;
    margin: 0 15px;
    background: white;
  }
  .Link_To_Img {
    width: 50%;
    height: 100%;
    position: relative;
    left: 25%;
  }
  .Link_To_Img:hover {
    color: pink;
    cursor: pointer;
  }
  // ------------------------------------------- 좌측 반응형 -------------------------------------------------------
  @media (max-width: 768px) {
    .Left-Main {
      width: 100%;
      height: 100%;
    }
    #Background-Option {
      display: none;
    }
    .Krikri-Love {
      border-radius: 0px;
    }
    .Krikri-Love .background-Img {
      border-radius: 0px;
    }
    .Choice-Title {
      display: none;
    }
    .Love-Face {
      width: 100%;
      height: 10%;
      position: relative;
      top: -95%;
      display: flex;
    }
    .Left-Face,
    .Right-Face {
      width: 50%;
      height: 100%;
      text-align: center;
    }
    /* 개인 사진 프로필 Div 부분 */
    .L-Face {
      position: relative;
      left: -30%;
      width: 30%;
      height: 100%;
      margin: 0 auto;
    }
    .R-Face {
      position: relative;
      right: -30%;
      width: 30%;
      height: 100%;
      margin: 0 auto;
    }
    /* 프로필 부분 */
    .Face {
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }
    /* 프로필 이미지 부분 */
    .Face img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    /* 프로필 이름 부분 */
    .Name {
      width: 100%;
      height: 30px;
      font-size: 1.5rem;
      margin-top: 5px;
    }
    .Love-Text,
    .Love,
    .Date {
      display: none;
    }
    .Love-Text2,
    .Love2,
    .Date2 {
      display: inline-block;
    }
    .Love-Text2 {
      position: relative;
      top: 0%;
      width: 200px;
      left: 11%;
      margin: 0 auto;
      font-weight: bold;
    }
    .Date2 {
      position: relative;
      top: 35%;
      width: 200px;
      left: -8%;
      font-weight: bold;
    }
    .Love2 {
      position: relative;
      top: 75%;
      width: 40px;
      height: 40px;
    }
    .Name {
      display: none;
    }
    .LeftName,
    .RightName {
      display: inline-block;
    }
    .LeftName {
      position: relative;
      left: 400%;
      top: -23%;
      width: 100%;
      height: 30px;
      font-size: 1.5rem;
    }
    .RightName {
      position: relative;
      right: 400%;
      top: -23%;
      width: 100%;
      height: 30px;
      font-size: 1.5rem;
    }
    .Krikri-Weather {
      display: none;
    }
    .Link_To_SideBar {
      display: block;
    }
    .Background-Choice {
      top: 45%;
      left: 20%;
    }
    .Profile-Choice {
      top: 45%;
      left: 20%;
    }
  }
`;
/* ------------------------------------우측 ------------------------------ */
const RightMainStyle = styled.div`
  width: 100%;
  height: 100vh;
  img {
    object-fit: cover;
  }
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
  /* 슬라이더 이름 부분 */
  .Left-Mall h4,
  .Right-Mall h4 {
    margin-top: 7px;
    color: rgba(255, 131, 141, 1);
  }
  /* 좌측 클릭 슬라이더 사이즈 부분 */
  .Left-Mall {
    width: 50%;
    height: 107%;
    overflow: hidden;
  }
  /* 좌측 클릭 슬라이더 부분 */
  .New-Issue {
    width: 500%;
    height: 90%;
    margin-top: 10px;
    display: flex;
  }
  /* 좌측 클릭 슬라이더 부분 */
  .New-Issue input {
    display: none;
  }
  /* 좌측 클릭 슬라이더 부분 */
  .slide {
    width: 20%;
    transition: 2s;
  }
  /* 좌측 클릭 슬라이더 이미지 부분 */
  .slide img {
    width: 100%;
    height: 100%;
  }
  /* 좌측 클릭 슬라이더 부분 */
  .navigation-manual {
    position: relative;
    width: 100%;
    margin-top: -40px;
    display: flex;
    justify-content: flex-end;
  }
  /* 좌측 클릭 슬라이더 버튼 부분 */
  .manual-btn {
    border: 2px solid #fff;
    padding: 5px;
    border-radius: 10px;
    cursor: pointer;
    transition: 1s;
  }
  /* 좌측 클릭 슬라이더 버튼 부분 */
  .manual-btn:not(:last-child) {
    margin-right: 10px;
  }
  /* 좌측 클릭 슬라이더 버튼 부분 */
  .manual-btn:last-child {
    margin-right: 10px;
  }
  /* 좌측 클릭 슬라이더 버튼 hover 부분 */
  .manual-btn:hover {
    background: #fff;
  }
  /* 좌측 클릭 슬라이더 버튼 체크 부분 */
  #radio1:checked ~ .first {
    margin-left: 0;
  }
  #radio2:checked ~ .first {
    margin-left: -20%;
  }
  #radio3:checked ~ .first {
    margin-left: -40%;
  }
  #radio4:checked ~ .first {
    margin-left: -60%;
  }
  /* 우측 자동 슬라이더 사이즈 부분 */
  .Right-Mall {
    width: 50%;
    height: 107%;
    overflow: hidden;
    margin-left: 18px;
  }
  /* 우측 자동 슬라이더 사이즈 부분 */
  .Date-Recommend {
    width: 500%;
    height: 90%;
    margin-top: 10px;
    display: flex;
  }
  /* 우측 자동 슬라이더 사이즈 부분 */
  .Date-Recommend input {
    display: none;
  }
  /* 우측 자동 슬라이더 사이즈 부분 */
  .auto-slide {
    width: 20%;
    transition: 2s;
  }
  /* 우측 자동 슬라이더 이미지 부분 */
  .auto-slide img {
    width: 100%;
    height: 80%;
    display: flex;
  }
  /* 슬라이더 이미지 내용 부분 */
  .auto-slide-text {
    width: 100%;
    height: 100%;
    font-size: 16px;
    padding-left: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    background-color: black;
    color: rgba(255, 170, 177, 1);
  }
  /* 우측 자동 슬라이더 부분 */
  .auto-navigation-manual {
    position: relative;
    width: 100%;
    margin-top: -40px;
    display: flex;
    justify-content: flex-end;
  }
  /* 우측 자동 슬라이더 버튼 부분 */
  .auto-manual-btn {
    border: 2px solid #fff;
    padding: 5px;
    border-radius: 10px;
    cursor: pointer;
    transition: 1s;
    display: none;
  }
  /* 우측 자동 슬라이더 버튼 사이즈 부분 */
  .auto-manual-btn:not(:last-child) {
    margin-right: 10px;
  }
  /* 우측 자동 슬라이더 버튼 사이즈 부분 */
  .auto-manual-btn:last-child {
    margin-right: 10px;
  }
  /* 우측 자동 슬라이더 버튼 hover 부분 */
  .auto-manual-btn:hover {
    background: #fff;
  }
  /* 우측 자동 슬라이더 버튼 체크 부분 */
  #auto-radio1:checked ~ .first2 {
    margin-left: 0;
  }
  #auto-radio2:checked ~ .first2 {
    margin-left: -20%;
  }
  #auto-radio3:checked ~ .first2 {
    margin-left: -40%;
  }
  #auto-radio4:checked ~ .first2 {
    margin-left: -60%;
  }
  /* 우측 자동 슬라이더 부분 */
  .A-navigation-auto {
    position: absolute;
    display: flex;
    background: chartreuse;
    justify-content: center;
    margin-top: 100px;
    display: none;
  }
  /* 우측 자동 슬라이더 부분 */
  .A-navigation-auto div {
    border: 2px solid #fff;
    padding: 5px;
    border-radius: 10px;
    transition: 1s;
  }
  /* 우측 자동 슬라이더 부분 */
  #auto-radio1:checked ~ .A-navigation-auto .A-auto-btn1 {
    background: #fff;
  }
  #auto-radio2:checked ~ .A-navigation-auto .A-auto-btn2 {
    background: #fff;
  }
  #auto-radio3:checked ~ .A-navigation-auto .A-auto-btn3 {
    background: #fff;
  }
  #auto-radio4:checked ~ .A-navigation-auto .A-auto-btn4 {
    background: #fff;
  }
  /* ------------------------------------------ 슬라이더 부분 끝 ------------------------------------------ */
  /* 캘린더 부분 */
  .Krikri-Calendar {
    width: 94%;
    height: 26vh;
    position: relative;
    top: 3%;
    margin-left: 3%;
    margin-top: 30px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 15px 15px 15px 15px / 15px 15px 15px 15px;
  }
  /* 캘린더 제목 부분 */
  .Krikri-Calendar h3 {
    margin-left: 3%;
    padding-top: 18px;
    color: rgba(255, 131, 141, 1);
  }
  /* 캘린더 알림 표시 Div 부분 */
  .To-Calendar {
    position: relative;
    top: -17%;
    width: 97%;
    height: 70%;
    margin-left: 3%;
    display: flex;
  }
  /* 캘린더 좌측 알림 표시 부분 */
  .Left-List {
    width: 50%;
    height: 100%;
    border-right: 3px solid rgba(115, 115, 115, 1);
    overflow: hidden;
  }
  /* 캘린더 좌측 알림 표시 부분 */
  .Left-List ul {
    margin: 0;
    padding: 0;
    display: flex;
    font-size: 1.1rem;
  }
  /* 캘린더 좌측 알림 표시 부분 */
  .Left-List ul li {
    margin: 10px 0px 10px 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  /* 캘린더 좌측 알림 표시 사이즈 부분 */
  .Left-List ul li:first-child {
    width: 30%;
    margin-right: 15px;
  }
  /* 캘린더 좌측 알림 표시 사이즈 부분 */
  .Left-List ul li:nth-child(2) {
    width: 40%;
    text-align: center;
  }
  /* 캘린더 좌측 알림 표시 사이즈 부분 */
  .Left-List ul li:last-child {
    margin-left: 15px;
    margin-right: 2px;
    width: 30%;
    text-align: center;
  }
  /* 캘린더 우측 알림 표시 부분 */
  .Right-List {
    width: 50%;
    height: 100%;
    overflow: hidden;
  }
  /* 캘린더 우측 알림 표시 부분 */
  .Right-List ul {
    display: flex;
    font-size: 1.1rem;
    margin-left: 28px;
    padding: 0;
  }
  /* 캘린더 우측 알림 표시 부분 */
  .Right-List ul li {
    margin: 10px 0px 10px 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  /* 캘린더 우측 알림 표시 사이즈 부분 */
  .Right-List ul li:first-child {
    width: 30%;
    margin-right: 15%;
  }
  /* 캘린더 우측 알림 표시 사이즈 부분 */
  .Right-List ul li:last-child {
    width: 30%;
  }

  /* ------------------------------------------ 캘린더 부분 끝 -------------------------------------------- */
  /* 앨범 Div 부분 */
  .Krikri-Album {
    width: 94%;
    height: 26vh;
    background-color: rgba(255, 255, 255, 1);
    position: relative;
    top: 5%;
    margin-top: 12px;
    margin-left: 3%;
    border-radius: 15px 15px 15px 15px / 15px 15px 15px 15px;
  }
  /* 앨범 타이틀 표시 부분 */
  .Krikri-Album h3 {
    margin-left: 3%;
    padding-top: 18px;
    color: rgba(255, 131, 141, 1);
  }

  /* 앨범 표시 부분 row col */
  .To-Album {
    position: relative;
    top: -17%;
    width: 100%;
    height: 70%;
    overflow: hidden;
  }

  .Show-Album {
    width: 100%;
    height: 80%;
    // margin-top: 10px;
    // margin-right: 34px;
  }
  .Show-Album img {
    width: 100%;
    height: 100%;
  }
  .Album-Date {
    width: 100%;
    text-align: left;
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    .Right-Main {
      display: none;
    }
  }
`;

function Popup_Open() {
  document.getElementById("Background-Choice").style.display = "block";
}

function Profile_Open() {
  document.getElementById("Profile-Choice").style.display = "block";
}

function Profile_Close() {
  document.getElementById("Profile-Choice").style.display = "none";
}

function Main() {
  const weathers = JSON.parse(localStorage.getItem("weather"));
  const icon = weathers.icon;
  const wethersImg = `http://openweathermap.org/img/wn/${icon}.png`;

  return (
    <Row className="main-contents m-0 p-0" md={2} sm={1}>
      <Col xl={5} md={5} className="h-100 m-0 p-0">
        <LeftMainStyle>
          <div className="Left-Main" id="Left-Main">
            <div className="Krikri-Love">
              {/* 배경화면 설정 팝업 */}
              <Popup />
              {/* 프로필 설정 팝업 */}
              <div className="Profile-Choice" id="Profile-Choice">
                <div className="Profile-Choice-Title">
                  <h4>프로필 설정 화면</h4>
                  <AiOutlinePlus className="Profile_Close" onClick={Profile_Close} />
                </div>
                <div className="Profile-Weather">
                  <div className="Profile-Weather-Img" id="ProfileWeatherImg">
                    <img src={wethersImg} width="100px" height="50px" />
                  </div>
                  <div className="Profile-Weather-Content">
                    <div className="Profile-Weather-Local" id="ProfileWeatherLocal">
                      {weathers.place}
                    </div>
                    <div className="Profile-Weather-Description" id="ProfileWeatherDescription">
                      {weathers.description}
                    </div>
                    <div className="Profile-Weather-Temperature" id="ProfileWeatherTemperature">
                      {weathers.temperature}
                    </div>
                  </div>
                </div>
                <div className="MyProfile">
                  <div className="ProfileIMG">
                    <img src={require("../../images/bgbgbg.png")} alt="프로필 사진" />
                  </div>
                  <div className="ProfileContent">
                    <ul>
                      <li>OOO</li>
                      <li>2020년-10월-27일</li>
                      <li>kkiri@kkiri.com</li>
                    </ul>
                  </div>
                  <div className="ProfileSetting">프로필 편집</div>
                </div>
              </div>
              <img
                src={require("../../images/bgbg.png")}
                alt="배경화면"
                className="background-Img"
              />
              <div className="Date-Love">
                <img
                  src={require("../../images/hamburger.png")}
                  alt="배경화면 설정"
                  id="Background-Option"
                  onClick={Popup_Open}
                />
                <div className="Love-Text">우리 함께한지</div>
                <FcLike className="Love" alt="하트" />
                <div className="Date">D - 000</div>
              </div>
              <div className="Love-Face">
                <div className="Left-Face">
                  <div className="L-Face">
                    <div className="Face">
                      <img src={require("../../images/bgbgbg.png")} alt="좌측 프로필 사진" />
                    </div>
                    <div className="Name">000</div>
                    {/* 반응형 */}
                    <div className="LeftName">000</div>
                    {/* 끝 */}
                  </div>
                </div>
                {/* 반응형에서 보여질 것 */}
                <div className="Love-Text2">우리 함께한지</div>
                <FcLike className="Love2" alt="하트" />
                <div className="Date2">D - 000</div>
                {/* 끝 */}
                <div className="Right-Face">
                  <div className="R-Face">
                    <div className="Face">
                      <img src={require("../../images/bgbgbg.png")} alt="우측 프로필 사진" />
                    </div>
                    <div className="Name">000</div>
                    {/* 반응형 */}
                    <div className="RightName">000</div>
                    {/* 끝 */}
                  </div>
                </div>
              </div>
              <div className="Krikri-Weather">
                <div className="Left-Weather">
                  <div className="Show-Weather">
                    <div className="Local" id="Local">
                      {weathers.place}
                    </div>
                    <div className="Weather-Image" id="weatherImage">
                      <img src={wethersImg} width="100px" height="50px" />
                    </div>
                    <div className="description" id="description">
                      {weathers.description}
                    </div>
                    <div className="temperature" id="tempe">
                      {weathers.temperature}
                    </div>
                  </div>
                </div>
                <div className="Right-Weather">
                  <div className="Show-Weather">
                    <div className="Local" id="Local2">
                      {weathers.place2}
                    </div>
                    <div className="Weather-Image" id="weatherImage2">
                      <img src={wethersImg} width="100px" height="50px" />
                    </div>
                    <div className="description" id="description2">
                      {weathers.description2}
                    </div>
                    <div className="temperature" id="tempe2">
                      {weathers.temperature}
                    </div>
                  </div>
                </div>
              </div>
              <div className="Link_To_SideBar">
                <ul>
                  <li>
                    <BsImageFill className="Link_To_Img" onClick={Popup_Open} />
                  </li>
                  <li>
                    <BsPeopleCircle className="Link_To_Img" onClick={Profile_Open} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </LeftMainStyle>
      </Col>
      <Col xl={7} md={7} className="h-100 m-0 p-0">
        <RightMainStyle>
          <div className="Right-Main" id="Right-Main">
            <div className="Krikri-Mall">
              <div className="Left-Mall">
                <h4>새로운 이슈</h4>
                <div className="New-Issue">
                  <input type="radio" name="radio-btn" id="radio1" />
                  <input type="radio" name="radio-btn" id="radio2" />
                  <input type="radio" name="radio-btn" id="radio3" />
                  <input type="radio" name="radio-btn" id="radio4" />
                  <div className="slide first">
                    <img
                      src={require("../../images/issue1.jfif")}
                      alt="새로운 이슈 첫번째 슬라이드"
                    />
                  </div>
                  <div className="slide">
                    <img
                      src={require("../../images/date1.jfif")}
                      alt="새로운 이슈 두번째 슬라이드"
                    />
                  </div>
                  <div className="slide">
                    <img
                      src={require("../../images/date2.jfif")}
                      alt="새로운 이슈 세번째 슬라이드"
                    />
                  </div>
                  <div className="slide">
                    <img
                      src={require("../../images/date3.jfif")}
                      alt="새로운 이슈 네번째 슬라이드"
                    />
                  </div>
                </div>
                <div className="navigation-manual">
                  <label htmlFor="radio1" className="manual-btn"></label>
                  <label htmlFor="radio2" className="manual-btn"></label>
                  <label htmlFor="radio3" className="manual-btn"></label>
                  <label htmlFor="radio4" className="manual-btn"></label>
                </div>
              </div>
              <div className="Right-Mall">
                <h4>데이트 추천장소</h4>
                <div className="Date-Recommend">
                  <input type="radio" name="auto-radio-btn" id="auto-radio1" />
                  <input type="radio" name="auto-radio-btn" id="auto-radio2" />
                  <input type="radio" name="auto-radio-btn" id="auto-radio3" />
                  <input type="radio" name="auto-radio-btn" id="auto-radio4" />
                  <div className="auto-slide first2">
                    <img src={require("../../images/al8.png")} alt="데이트 추천장소 첫번째" />
                    <div className="auto-slide-text">자동 슬라이드1</div>
                  </div>
                  <div className="auto-slide">
                    <img src={require("../../images/al7.png")} alt="데이트 추천장소 두번째" />
                    <div className="auto-slide-text">자동 슬라이드2</div>
                  </div>
                  <div className="auto-slide">
                    <img src={require("../../images/al6.png")} alt="데이트 추천장소 세번째" />
                    <div className="auto-slide-text">자동 슬라이드3</div>
                  </div>
                  <div className="auto-slide">
                    <img src={require("../../images/al5.png")} alt="데이트 추천장소 네번째" />
                    <div className="auto-slide-text">자동 슬라이드4</div>
                  </div>
                  <div className="A-navigation-auto">
                    <div className="A-auto-btn1"></div>
                    <div className="A-auto-btn2"></div>
                    <div className="A-auto-btn3"></div>
                    <div className="A-auto-btn4"></div>
                  </div>
                </div>
                <div className="auto-navigation-manual">
                  <label htmlFor="auto-radio1" className="auto-manual-btn"></label>
                  <label htmlFor="auto-radio2" className="auto-manual-btn"></label>
                  <label htmlFor="auto-radio3" className="auto-manual-btn"></label>
                  <label htmlFor="auto-radio4" className="auto-manual-btn"></label>
                </div>
              </div>
            </div>
            <div className="Krikri-Calendar">
              <h3>Calendar</h3>
              <img
                src={require("../../images/plus.png")}
                className="Calender-Add"
                alt="캘린더 설정"
              />
              <div className="To-Calendar">
                <div className="Left-List">
                  <ul>
                    <li>20-00-00</li>
                    <li>TitleTitleTitleTitleTitle</li>
                    <li>00000</li>
                  </ul>
                </div>
                <div className="Right-List">
                  <ul>
                    <li>20-00-00</li>
                    <li>D-000</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="Krikri-Album">
              <h3>Album</h3>
              <img src={require("../../images/plus.png")} className="Album-Add" alt="앨범 설정" />
              <Row className="m-0 p-0 To-Album" md={1}>
                <Col className="Show-Album" md={2} sm={1}>
                  <img src={require("../../images/al2.png")} alt="첫번째 앨범" />
                  <div className="Album-Date">2020-00-00</div>
                </Col>
                <Col className="Show-Album" md={2}>
                  <img src={require("../../images/al3.png")} alt="첫번째 앨범" />
                  <div className="Album-Date">2020-00-00</div>
                </Col>
                <Col className="Show-Album" md={2}>
                  <img src={require("../../images/al4.png")} alt="첫번째 앨범" />
                  <div className="Album-Date">2020-00-00</div>
                </Col>
                <Col className="Show-Album" md={2}>
                  <img src={require("../../images/al5.png")} alt="첫번째 앨범" />
                  <div className="Album-Date">2020-00-00</div>
                </Col>
                <Col className="Show-Album" md={2}>
                  <img src={require("../../images/al6.png")} alt="첫번째 앨범" />
                  <div className="Album-Date">2020-00-00</div>
                </Col>
                <Col className="Show-Album" md={2}>
                  <img src={require("../../images/al7.png")} alt="첫번째 앨범" />
                  <div className="Album-Date">2020-00-00</div>
                </Col>
              </Row>
            </div>
          </div>
        </RightMainStyle>
      </Col>
    </Row>
  );
}

export default Main;
