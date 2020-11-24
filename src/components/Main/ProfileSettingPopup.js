import React, { Component } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";
import axios from "axios";
import member from "../../modules/member";

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
    height: 45%;
    display: flex;
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
    left: 7%;
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
    left: -2%;
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
  .choiceSelect {
    width: 100%;
    margin-top: 2%;
    position: relative;
    display: flex;
  }
  .ex_file {
    width: 90%;
    margin-left: 5%;
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

  handleChange = (event) => {
    let reader = new FileReader();
    reader.onloadend = (e) => {
      // 2. 읽기가 완료되면 아래코드가 실행
      const base64 = reader.result; //reader.result는 이미지를 인코딩(base64 ->이미지를 text인코딩)한 결괏값이 나온다.
      if (base64) {
        this.setState({
          imgBase64: base64.toString(), // 파일 base64 상태 업데이트
        });
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
      this.setState({
        files: event.target.files[0], // 파일 상태 업데이트 업로드 하는것은 파일이기 때문에 관리 필요
        value: event.target.files[0].name,
      });
    }
  };

  handlePost = () => {
    console.log(this.state.files + "핸들포스트");
    const formData = new FormData();
    formData.append("files", this.state.files, this.state.files.name);
    console.log(formData);

    axios
      .post("/api/profilesetting/fileupload", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleRemove = () => {
    this.setState({
      imgBase64: "https://cdn.pixabay.com/photo/2018/08/31/18/17/fantasy-3645263_1280.jpg",
      files: "",
      value: "",
    });
  };

  render() {
    const aaa = member.email;
    console.log(aaa + "제발 프로필 나와주세요!");
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
                <li>{member.name}</li>
                <li>2020년-10월-27일</li>
                <li>kkiri@kkiri.com</li>
              </ul>
            </div>
          </div>
          <form
            name="accountFrm"
            className="choiceSelect"
            onSubmit={this.handlePost}
            encType="multipart/form-data"
          >
            <div className="Choice-File-Button">
              <input
                type="file"
                name="files"
                id="files"
                accept="image/*"
                className="ex_file"
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="ProfileSetting">
              저장하기
            </button>
          </form>
        </div>
      </ProfilePopups>
    );
  }
}

export default ProfileSettingPopup;
