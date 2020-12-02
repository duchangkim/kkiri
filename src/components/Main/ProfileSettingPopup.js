import React, { Component } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import styled from 'styled-components';
import axios from 'axios';

const MODAL_STYLES = {
  position: 'relative',
  top: `0`,
  left: `0`,
  fransform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  zIndex: 1500,
  borderRadius: 10,
};
const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.25)',
  zIndex: 1500,
};

const ProfilePopups = styled.div`
  *:focus {
    outline: none;
  }
  * {
    list-style: none;
  }
  .Profile-Choice {
    position: absolute;
    z-index: 1000;
    top: 380px;
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
    margin-top: 20%;
    margin-left: 25%;
    width: 50%;
    height: 50%;
    object-fit: cover;
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
    height: 120px;
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
    border: none;
    color: white;
    background-color: rgba(255, 131, 141, 1);
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
      top: 300px;
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
    imgBase64:
      `${this.props.member.mainSetting.coupleProfile1}` === ''
        ? `https://cdn0.iconfinder.com/data/icons/user-collection-4/512/user-128.png`
        : `http://localhost:3000/uploads/${this.props.member.coupleShareCode}/${this.props.member.mainSetting.coupleProfile1}`,
    files: '',
    value: '',
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
    console.log(this.state.files + '핸들포스트');
    const formData = new FormData();
    formData.append('files', this.state.files, this.state.files.name);
    console.log(formData);

    axios
      .post('/api/profilesetting/fileupload', formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleRemove = () => {
    this.setState({
      imgBase64:
        `${this.props.member.mainSetting.coupleProfile1}` === ''
          ? `https://cdn0.iconfinder.com/data/icons/user-collection-4/512/user-128.png`
          : `http://localhost:3000/uploads/${this.props.member.coupleShareCode}/${this.props.member.mainSetting.coupleProfile1}`,
      files: '',
      value: '',
    });
  };

  render() {
    console.log(this.props);
    const myWeatherIconSrc = `http://openweathermap.org/img/wn/${this.props.myWeather.weather[0].icon}.png`;

    return (
      <>
        <div style={OVERLAY_STYLES} />
        <div style={MODAL_STYLES}>
          <ProfilePopups>
            <div className="Profile-Choice" id="Profile-Choice">
              <div className="Profile-Choice-Title">
                <h4>프로필 설정 화면</h4>
                <AiOutlinePlus
                  className="Profile_Close"
                  onClick={this.props.handleProfileSettingPopupOpenClick}
                />
              </div>
              <div className="Profile-Weather">
                <div className="Profile-Weather-Img" id="ProfileWeatherImg">
                  <img src={myWeatherIconSrc} alt="weather icon" />
                </div>
                <div className="Profile-Weather-Content">
                  <div
                    className="Profile-Weather-Local"
                    id="ProfileWeatherLocal"
                  >
                    {this.props.myWeather.name}
                  </div>
                  <div
                    className="Profile-Weather-Description"
                    id="ProfileWeatherDescription"
                  >
                    {this.props.myWeather.weather[0].description}
                  </div>
                  <div
                    className="Profile-Weather-Temperature"
                    id="ProfileWeatherTemperature"
                  >
                    {`${Math.floor(this.props.myWeather.main.temp)}ºC`}
                  </div>
                </div>
              </div>
              <div className="MyProfile">
                <div className="ProfileIMG">
                  {this.state.imgBase64 ? (
                    <img
                      src={this.state.imgBase64}
                      onClick={this.handleRemove}
                      alt="프로필 사진"
                    ></img>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="ProfileContent">
                  <ul>
                    <li>{this.props.member.name}</li>
                    <li>{this.props.member.hp}</li>
                    <li>{this.props.member.email}</li>
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
        </div>
      </>
    );
  }
}

export default ProfileSettingPopup;
