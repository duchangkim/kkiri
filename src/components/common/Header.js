import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Responsive from "./Responsive";
import Button from "./Button";
import auth from "../../modules/auth";

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  z-index: 100;
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.6rem;
    font-weight: 800;
    letter-spacing: 2px;
    color: #fff;
    font-family: MaplestoryOTFBold;
  }
  .logo:hover {
    text-decoration: none;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const Header = ({ member, onLogout, children }) => {
  console.log(member);
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            KKiri
          </Link>
          {member ? (
            <div className="right">
              <UserInfo>{member.email}</UserInfo>
              <Button onClick={onLogout}>로그아웃</Button>
              {member.coupleShareCode ? null : (
                <Button to="/registercouple">코드입력</Button>
              )}
            </div>
          ) : (
            <div className="right">
              <Button to="/login">로그인</Button>
            </div>
          )}
        </Wrapper>
        {children}
      </HeaderBlock>
    </>
  );
};

export default Header;
