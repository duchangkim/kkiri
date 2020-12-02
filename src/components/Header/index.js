import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import BackgroundSettingPopup from '../Main/BackgroundSettingPopup';
import ProfileSettingPopup from '../Main/ProfileSettingPopup';
import { BsSearch, BsPeopleCircle, BsImage } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import getPosition from '../../lib/getPosition';
import { getMyWeather } from '../../modules/weather';

const HeaderLeft = styled.div`
  width: 100%;
  height: 100%;
  .Krikri-Select {
    width: 90%;
    height: 50px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    border: 3px solid rgba(255, 170, 177, 1);
    border-radius: 30px;
    margin-right: 28px;
  }

  /* 검색 부분 */
  .Search {
    height: 50px;
    display: flex;
  }
  /* 검색 버튼 부분 */
  .Img-Button {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 50px;
    height: 44px;
    border: none;
    background: transparent;
    outline: none;
    color: #555555;
    background-color: white;
    border-radius: 30px 0px 0px 30px / 30px 0px 0px 30px;
  }
  .Img-Button:focus {
    outline: none !important;
  }
  /* 검색 이미지 hover 부분 */
  .Img-Button img:hover {
    cursor: pointer;
  }
  /* 검색 input 부분 */
  .Search-Keyword {
    width: 95%;
    height: 44px;
    font-size: 16px;
    border: none;
    vertical-align: middle;
    border-radius: 0px 30px 30px 0px / 30px 30px 30px 30px;
  }
  /* 검색 input:focus 부분 */
  .Search-Keyword:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderRight = styled.div`
  width: 100%;
  height: 100%;
  .Krikri-Header {
    margin-left: 28px;
    height: 70px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  .Krikri-Name {
    position: relative;
    top: 25%;
    transform: translateY(-25%);
    font-size: 150%;
    font-weight: bold;
  }

  .Krikri-Date {
    margin-top: 8px;
    font-size: 18px;
    color: rgba(181, 181, 183, 1);
  }

  .Krikri-Header-Background {
    /* width: 35px;
    height: 35px; */
    width: 5%;
    height: 50%;
    position: relative;
    top: -80%;
    right: -80%;
  }

  .Krikri-Header-Profile {
    /* width: 35px;
    height: 35px; */
    width: 5%;
    height: 50%;
    position: relative;
    top: -80%;
    right: -83%;
  }
  .Krikri-Header-Background:hover,
  .Krikri-Header-Profile:hover {
    cursor: pointer;
    color: #ff949d;
  }

  @media (max-width: 768px) {
    .Krikri-Header {
      width: 90%;
      margin: 0 auto;
      height: 70px;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
    .Krikri-Name {
      font-size: 100%;
    }
    .Krikri-Header-Background {
      position: relative;
      top: -80%;
      right: -88%;
    }
    .Krikri-Header-Profile {
      position: relative;
      top: -80%;
      right: -91%;
    }
    .Krikri-Header-Background,
    .Krikri-Header-Profile {
      position: relative;
      top: -60%;
    }
  }
`;

function Header() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const today = year + '년 ' + month + '월 ' + day + '일';

  const [backgroundSettingOpen, setbackgroundSettingOpen] = useState(false);
  const [ProfileSettingPopupOpen, setProfileSettingPopupOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleBackgroundSettingOpenClick = () =>
    setbackgroundSettingOpen(!backgroundSettingOpen);
  const handleProfileSettingPopupOpenClick = () =>
    setProfileSettingPopupOpen(!ProfileSettingPopupOpen);

  const dispatch = useDispatch();
  const { myWeather, member } = useSelector(({ weather, member }) => ({
    myWeather: weather.myWeather,
    member: member.member,
  }));

  useEffect(() => {
    getPosition(dispatch, getMyWeather);
  }, [dispatch]);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    window.open('https:///www.google.co.kr/search?q=' + searchValue);
  };

  return (
    <>
      <Col md={5} className="m-0 p-0">
        <HeaderLeft>
          {/* 배경화면 설정 팝업 */}
          {backgroundSettingOpen ? (
            <BackgroundSettingPopup
              handleBackgroundSettingOpenClick={
                handleBackgroundSettingOpenClick
              }
              member={member}
            />
          ) : null}
          {ProfileSettingPopupOpen ? (
            <ProfileSettingPopup
              handleProfileSettingPopupOpenClick={
                handleProfileSettingPopupOpenClick
              }
              myWeather={myWeather}
              member={member}
            />
          ) : null}
          <div className="Krikri-Select" id="Krikri-Select">
            <form className="Search" id="Search" onSubmit={handleSubmit}>
              <button
                className="Img-Button"
                id="Img-Button"
                type="submit"
                name="click"
                value=""
              >
                <BsSearch />
              </button>
              <input
                onChange={handleChange}
                className="Search-Keyword"
                type="text"
                name="search"
                placeholder="Google 검색"
                autoComplete="off"
              />
            </form>
          </div>
        </HeaderLeft>
      </Col>
      <Col md={7} className="m-0 p-0">
        <HeaderRight>
          <div className="Krikri-Header">
            <div className="Krikri-Name">우리들만의 끼리끼리:）</div>
            <div className="Krikri-Date">{today}</div>
            <BsImage
              className="Krikri-Header-Background"
              onClick={handleBackgroundSettingOpenClick}
            />
            <BsPeopleCircle
              className="Krikri-Header-Profile"
              onClick={handleProfileSettingPopupOpenClick}
            />
          </div>
        </HeaderRight>
      </Col>
    </>
  );
}

export default Header;
