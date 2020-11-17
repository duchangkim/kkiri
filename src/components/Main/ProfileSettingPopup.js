import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const ProfileSettingPopup = ({ weathers, wethersImg, onProfileSettingCloseClick }) => {
  return (
    <div className="Profile-Choice" id="Profile-Choice">
      <div className="Profile-Choice-Title">
        <h4>프로필 설정 화면</h4>
        <AiOutlinePlus className="Profile_Close" onClick={onProfileSettingCloseClick} />
      </div>
      <div className="Profile-Weather">
        <div className="Profile-Weather-Img" id="ProfileWeatherImg">
          <img src={wethersImg} width="100px" height="50px" alt="weather icon" />
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
  );
};

export default ProfileSettingPopup;
