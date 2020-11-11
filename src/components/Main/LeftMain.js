import React, { useState } from 'react';
import styled from 'styled-components';
import { FcLike } from 'react-icons/fc';
import { BsPeopleCircle, BsImageFill } from 'react-icons/bs';

import ProfileSettingPopup from './ProfileSettingPopup';
import BackgroundSettingPopup from './BackgroundSettingPopup';

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

const LeftMain = ({ weathers, weatherImage }) => {
  const [backgroundSettingOpen, setbackgroundSettingOpen] = useState(false);
  const handleBackgroundSettingOpenClick = () =>
    setbackgroundSettingOpen(!backgroundSettingOpen);

  return (
    <LeftMainBlock>
      <div className="Left-Main" id="Left-Main">
        <div className="Krikri-Love">
          {/* 배경화면 설정 팝업 */}
          {backgroundSettingOpen ? (
            <BackgroundSettingPopup
              handleBackgroundSettingOpenClick={
                handleBackgroundSettingOpenClick
              }
            />
          ) : null}
          {/* 프로필 설정 팝업 */}
          {/* <ProfileSettingPopup /> */}
          <img
            src={require('../../images/bgbg.png')}
            alt="배경화면"
            className="background-Img"
          />
          <div className="Date-Love">
            <img
              src={require('../../images/hamburger.png')}
              alt="배경화면 설정"
              id="Background-Option"
              onClick={handleBackgroundSettingOpenClick}
            />
            <div className="Love-Text">우리 함께한지</div>
            <FcLike className="Love" alt="하트" />
            <div className="Date">D - 000</div>
          </div>
          <div className="Love-Face">
            <div className="Left-Face">
              <div className="L-Face">
                <div className="Face">
                  <img
                    src={require('../../images/bgbgbg.png')}
                    alt="좌측 프로필 사진"
                  />
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
                  <img
                    src={require('../../images/bgbgbg.png')}
                    alt="우측 프로필 사진"
                  />
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
                  <img
                    src={weatherImage}
                    width="100px"
                    height="50px"
                    alt="weather icon"
                  />
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
                  <img
                    src={weatherImage}
                    width="100px"
                    height="50px"
                    alt="weather icon"
                  />
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
                <BsImageFill className="Link_To_Img" />
              </li>
              <li>
                <BsPeopleCircle className="Link_To_Img" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </LeftMainBlock>
  );
};

export default LeftMain;
