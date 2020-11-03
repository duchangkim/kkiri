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
const activeStyle = {
  outline: "none",
  color: "#ff838d",
  borderRight: "6px solid #ff838d",
};
export const KkiriLogo = () => {
  return <StyledHeading>Kkiri</StyledHeading>;
};

export const Navigation = () => {
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
          to="/kkiri/album"
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
