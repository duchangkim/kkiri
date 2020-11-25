import img3 from "./images/welcome_image.jpg";
import React from "react";
import Carousel from "nuka-carousel";
import styled from "styled-components";

const WelcomeCss = styled.div`
  .slider-frame {
    height: 100vh !important;
  }
  .slider-list {
    height: 100% !important;
  }
`;

export default class extends React.Component {
  render() {
    return (
      <WelcomeCss>
        <Carousel>
          <div>
            <img src={img3} alt="" />
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
                    <Button to="/register">회원가입</Button>
                  </div>
                )}
              </Wrapper>
              {children}
            </HeaderBlock>
          </div>
          <img
            src="https://via.placeholder.com/400/ffffff/c0392b/&text=slide3"
            alt=""
          />
          <img
            src="https://via.placeholder.com/400/ffffff/c0392b/&text=slide4"
            alt=""
          />
          <img
            src="https://via.placeholder.com/400/ffffff/c0392b/&text=slide5"
            alt=""
          />
          <img
            src="https://via.placeholder.com/400/ffffff/c0392b/&text=slide6"
            alt=""
          />
        </Carousel>
      </WelcomeCss>
    );
  }
}
