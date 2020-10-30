import React from "react";
import styled from "styled-components";
import SideMenu from "react-sidebar";
import { KkiriLogo, Navigation } from "./SideBarItems";
import { Link } from "react-router-dom";

const Styles = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;

  min-width: 120px;
  width: 8.333333%;

  .custom-sidebar {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-width: 120px;
    margin: 30px 0;
    // border-right: 10px solid #ddd;
    box-shadow: none !important;
    z-index: 0 !important;
  }
  .btn-link {
    color: #555;
  }
  .btn-link:focus {
    box-shadow: none;
  }
`;
const NavigationBar = ({ windowMatches }) => {
  return (
    <Styles>
      <SideMenu
        sidebarClassName="custom-sidebar"
        sidebar={
          <>
            <KkiriLogo />
            <Navigation />
            <Link to="/auth/logout" className="btn btn-link">
              Logout
            </Link>
          </>
        }
        open={windowMatches}
        docked={windowMatches}
      >
        <></>
      </SideMenu>
    </Styles>
  );
};

export default NavigationBar;
