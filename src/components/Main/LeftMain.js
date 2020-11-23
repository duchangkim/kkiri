import React, { useState } from "react";
import styled from "styled-components";
import { FcLike } from "react-icons/fc";
import { BsPeopleCircle, BsImageFill } from "react-icons/bs";
import { withRouter } from "react-router-dom";
import { Button, FormControl, InputGroup } from "react-bootstrap";

import ProfileSettingPopup from "./ProfileSettingPopup";
import BackgroundSettingPopup from "./BackgroundSettingPopup";
import calculateDday from "../../lib/calculateDday";

const LeftMainBlock = styled.div`
  width: 100%;
  height: 100%;
  li {
    list-style: none;
  }
  img {
    object-fit: cover;
  }
`;
const DdayInputBlock = styled.div`
  padding: 0 14%;
  .dday-massage {
    padding: 2%;
    background: rgba(236, 226, 226, 0.4);
    font-weight: bold;
  }
  button {
    background: #ff838d;
    color: #ffffff;
    border: none;

    &:hover, &:active {
      background: #ff9ba3;
    }
    &:focus {
      box-shadow: none;
    }
  }

  @media ${(props) => props.theme.mobile} {
    padding-top: 10%;
  }
`;

const LeftMain = ({
  myWeather,
  yourWeather,
  couple,
  member,
  onSaveButtonClick,
  onDateInputChange,
  dateInputValue,
}) => {
  const isLoad = [
    myWeather,
    yourWeather,
    couple,
    member,
    onSaveButtonClick,
    onDateInputChange,
    dateInputValue,
  ];

  const [backgroundSettingOpen, setbackgroundSettingOpen] = useState(false);
  const [ProfileSettingPopupOpen, setProfileSettingPopupOpen] = useState(false);

  const handleBackgroundSettingOpenClick = () => setbackgroundSettingOpen(!backgroundSettingOpen);
  const handleProfileSettingPopupOpenClick = () =>
    setProfileSettingPopupOpen(!ProfileSettingPopupOpen);

  const myWeatherIconSrc = `http://openweathermap.org/img/wn/${myWeather.weather[0].icon}.png`;
  const yourWeatherIconSrc = `http://openweathermap.org/img/wn/${yourWeather.weather[0].icon}.png`;

  if (isLoad.includes(null)) {
    return <h1>Loading...</h1>;
  }

  return (
    <LeftMainBlock>
      <div className="Left-Main" id="Left-Main">
        <div className="Krikri-Love">
          {/* 배경화면 설정 팝업 */}
          {backgroundSettingOpen ? (
            <BackgroundSettingPopup
              handleBackgroundSettingOpenClick={handleBackgroundSettingOpenClick}
            />
          ) : null}
          {/* 프로필 설정 팝업 */}
          {/* <ProfileSettingPopup /> */}
          {ProfileSettingPopupOpen ? (
            <ProfileSettingPopup
              handleProfileSettingPopupOpenClick={handleProfileSettingPopupOpenClick}
            />
          ) : null}
          <img src={require("../../images/bgbg.png")} alt="배경화면" className="background-Img" />
          <div className="Date-Love">
            <img
              src={require("../../images/hamburger.png")}
              alt="배경화면 설정"
              id="Background-Option"
              onClick={handleBackgroundSettingOpenClick}
            />
            {member.getTogetherDate !== null ? (
              <>
                <div className="Love-Text">우리 함께한지</div>
                <FcLike className="Love" alt="하트" />
                <div className="Date">
                  {calculateDday(new Date(member.getTogetherDate))}
                </div>
              </>
            ) : (
              <DdayInputBlock>
                <div className="dday-massage">커플 디데이를 입력하세요</div>
                <br/>
                <InputGroup>
                  <FormControl
                    onChange={onDateInputChange}
                    name="getTogetherDate"
                    value={dateInputValue}
                    type="date"
                    required
                  />
                  <InputGroup.Append>
                    <Button onClick={onSaveButtonClick} variant="outline-secondary">
                      저장
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </DdayInputBlock>
            )}
          </div>
          <div className="Love-Face">
            <div className="Left-Face">
              <div className="L-Face">
                <div className="Face">
                  <img src={require("../../images/bgbgbg.png")} alt="좌측 프로필 사진" />
                </div>
                <div className="Name">{member.name}</div>
                {/* 반응형 */}
                <div className="LeftName">{member.name}</div>
                {/* 끝 */}
              </div>
            </div>
            {/* 반응형에서 보여질 것 */}
            <div className="Love-Text2">우리 함께한지</div>
            <FcLike className="Love2" alt="하트" />
            <div className="Date2">
              {member.getTogetherDate !== null ? (
                calculateDday(new Date(member.getTogetherDate))
                ) : (
                null
              )}
            </div>
            {/* 끝 */}
            <div className="Right-Face">
              <div className="R-Face">
                <div className="Face">
                  <img src={require("../../images/bgbgbg.png")} alt="우측 프로필 사진" />
                </div>
                <div className="Name">{couple.name}</div>
                {/* 반응형 */}
                <div className="RightName">{couple.name}</div>
                {/* 끝 */}
              </div>
            </div>
          </div>
          <div className="Krikri-Weather">
            <div className="Left-Weather">
              <div className="Show-Weather">
                <div className="Local" id="Local">
                  {myWeather.name}
                </div>
                <div className="Weather-Image" id="weatherImage">
                  <img src={myWeatherIconSrc} alt="weather icon" />
                </div>
                <div className="description" id="description">
                  {myWeather.weather[0].description}
                </div>
                <div className="temperature" id="tempe">
                  {`${Math.floor(myWeather.main.temp)}ºC`}
                </div>
              </div>
            </div>
            <div className="Right-Weather">
              <div className="Show-Weather">
                <div className="Local" id="Local2">
                  {yourWeather.name}
                </div>
                <div className="Weather-Image" id="weatherImage2">
                  <img src={yourWeatherIconSrc} alt="weather icon" />
                </div>
                <div className="description" id="description2">
                  {yourWeather.weather[0].description}
                </div>
                <div className="temperature" id="tempe2">
                  {`${Math.floor(yourWeather.main.temp)}ºC`}
                </div>
              </div>
            </div>
          </div>
          <div className="Link_To_SideBar">
            <ul>
              <li>
                <BsImageFill className="Link_To_Img" />
              </li>
              <li>
                <BsPeopleCircle
                  className="Link_To_Img"
                  onClick={handleProfileSettingPopupOpenClick}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </LeftMainBlock>
  );
};

export default withRouter(LeftMain);
