import React, { Component } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";

const ProfilePopups = styled.div`
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
    font-size: 0.9rem;
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

  @media (max-width: 768px) {
    .Profile-Choice {
      position: absolute;
      z-index: 1000;
      top: 40%;
      left: 10%;
      transform: translateY(-40%);
      width: 400px;
      height: 450px;
      background-color: white;
      border-radius: 10px;
    }
  }
`;

class ProfileSettingPopup extends Component {
  state = {
    imgBase64: "https://cdn.pixabay.com/photo/2018/08/31/18/17/fantasy-3645263_1280.jpg",
    files: "",
    value: "",
  };
  render() {
    return (
      <ProfilePopups>
        <div className="Profile-Choice" id="Profile-Choice">
          <div className="Profile-Choice-Title">
            <h4>프로필 설정 화면</h4>
            <AiOutlinePlus className="Profile_Close" />
          </div>
          <div className="Profile-Weather">
            <div className="Profile-Weather-Img" id="ProfileWeatherImg">
              <img
                src={require("../../images/bgbgbg.png")}
                width="100px"
                height="50px"
                alt="weather icon"
              />
            </div>
            <div className="Profile-Weather-Content">
              <div className="Profile-Weather-Local" id="ProfileWeatherLocal">
                {/* {weathers.place} */}
              </div>
              <div className="Profile-Weather-Description" id="ProfileWeatherDescription">
                {/* {weathers.description} */}
              </div>
              <div className="Profile-Weather-Temperature" id="ProfileWeatherTemperature">
                {/* {weathers.temperature} */}
              </div>
            </div>
          </div>
          <div className="MyProfile">
            <div className="ProfileIMG">
              {this.state.imgBase64 ? (
                <img src={this.state.imgBase64} onClick={this.handleRemove} alt="프로필 사진"></img>
              ) : (
                <div></div>
              )}
            </div>
            <div className="ProfileContent">
              <ul>
                <li>OOO</li>
                <li>2020년-10월-27일</li>
                <li>kkiri@kkiri.com</li>
              </ul>
            </div>
            <form
              name="accountFrm"
              className="choiceSelect"
              onSubmit={this.handlePost}
              encType="multipart/form-data"
            >
              <button type="submit" className="ProfileSetting">
                프로필 편집
              </button>
            </form>
          </div>
        </div>
      </ProfilePopups>
    );
  }
}

export default ProfileSettingPopup;
