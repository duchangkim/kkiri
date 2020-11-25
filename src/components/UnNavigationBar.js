import React from 'react';
import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import {
  BsFillChatDotsFill,
  BsImages,
  BsGearFill,
  BsCalendarFill,
} from 'react-icons/bs';

const Styles = styled.div`
  border-top: 1px solid #a9a9a9;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 10%;
  overflow: hidden;

  .navbar {
    display: flex;
    height: 100%;
    padding: 0;
  }
  .navbar a {
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    margin: 0 auto;
    padding: 0;
    text-align: center;
    font-size: 2.4rem;
    color: #a9a9a9;
    text-decoration: none;
  }
  .navbar a:hover,
  .navbar a:focus {
    outline: none;
    color: #ff838d;
  }
  .navbar a.active {
    outline: none;
    color: #ff838d;
  }
  .Imgname {
    font-size: 0.85rem;
    text-align: center;
  }
  .unnavbar-brand {
    height: 80%;
    width: 75px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #fff0f5;
  }
  a {
    position: relative;
  }
`;
const New = styled.div`
  position: absolute;
  top: -1px;
  right: -5px;
  color: #ff838d;
  font-size: 1rem;
  font-weight: bold;

  animation-duration: 2s;
  animation-iteration-count: infinite;

  animation-name: bounce;
  animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);

  @keyframes bounce {
    0% {
      transform: scale(1, 1) translateY(0);
    }
    10% {
      transform: scale(1.1, 0.9) translateY(0);
    }
    30% {
      transform: scale(0.9, 1.1) translateY(-10px);
    }
    50% {
      transform: scale(1.05, 0.95) translateY(0);
    }
    57% {
      transform: scale(1, 1) translateY(-7px);
    }
    64% {
      transform: scale(1, 1) translateY(0);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }
`;

const UnNavigationBar = ({ newMessage }) => {
  return (
    <Styles>
      <Navbar>
        <NavLink to="/kkiri/home">
          <AiFillHome />
          <span className="Imgname">홈</span>
        </NavLink>
        <NavLink to="/kkiri/calendar">
          <BsCalendarFill />
          <span className="Imgname">캘린더</span>
        </NavLink>
        <NavLink to="/kkiri/chatting" className="unnavbar-brand">
          {newMessage && <New>New</New>}
          <BsFillChatDotsFill />
        </NavLink>
        <NavLink to="/kkiri/albums">
          <BsImages />
          <span className="Imgname">앨범</span>
        </NavLink>
        <NavLink to="/kkiri/setting">
          <BsGearFill />
          <span className="Imgname">설정</span>
        </NavLink>
      </Navbar>
    </Styles>
  );
};

export default UnNavigationBar;
