import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import {
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlinePicture,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";

const Styles = styled.div`
  height: 70%;
  overflow: hidden;
  .navbar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 0;
  }
  .navbar a {
    position: relative;
    width: 100%;
    height: 100px !important;
    margin: 0;
    padding: 0;
    padding-top: 15px;
    padding-left: 6px;
    border-right: 6px solid #fff;
    text-align: center;
    font-size: 2.4rem;
    color: #a9a9a9;
  }
  .navbar a:hover,
  .navbar a:focus {
    outline: none;
    color: #ff838d;
    transition: all 0.2s ease-in;
    border-right: 6px solid #ff838d;
  }
  .navbar a.active {
    outline: none;
    color: #ff838d;
    border-right: 6px solid #ff838d;
  }
`;
const StyledHeading = styled.h1`
  width: 100%;
  text-align: center;
  font-family: MaplestoryOTFBold;
  font-size: 2.2em;
  color: #555;
  cursor: context-menu;
`;
const New = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
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

const activeStyle = {
  outline: "none",
  color: "#ff838d",
  borderRight: "6px solid #ff838d",
};
export const KkiriLogo = () => {
  return <StyledHeading>Kkiri</StyledHeading>;
};

export const Navigation = ({ newMessage }) => {
  return (
    <Styles>
      <Navbar expand="sm">
        <NavLink
          to="/kkiri/home"
          className="navbar-brand"
          activeStyle={activeStyle}
        >
          <AiOutlineHome />
        </NavLink>
        <NavLink
          to="/kkiri/calendar"
          className="navbar-brand"
          activeStyle={activeStyle}
        >
          <AiOutlineCalendar />
        </NavLink>
        <NavLink
          to="/kkiri/albums"
          className="navbar-brand"
          activeStyle={activeStyle}
        >
          <AiOutlinePicture />
        </NavLink>
        <NavLink
          to="/kkiri/chatting"
          className="navbar-brand"
          activeStyle={activeStyle}
        >
          {newMessage && <New>New</New>}
          <BsChatDots />
        </NavLink>
        <NavLink
          to="/kkiri/setting"
          className="navbar-brand"
          activeStyle={activeStyle}
        >
          <AiOutlineSetting />
        </NavLink>
      </Navbar>
    </Styles>
  );
};
