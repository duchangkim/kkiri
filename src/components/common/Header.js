import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Responsive from "./Responsive";
import Button from "./Button";
import Carousel from "nuka-carousel";
import img3 from "./images/welcome_image.jpg";
import titleimg1 from "./images/titleimg1.png";
import titleimg2 from "./images/titleimg2.png";
import titleimg3 from "./images/titleimg3.png";

import { Container } from "react-bootstrap";

const WelcomeCss = styled.div`
  .slider-frame {
    height: 100vh !important;
  }
  .slider-list {
    height: 100% !important;
  }
  .slider-slide {
    background-color: #f7f5f2;
  }
  img {
    width: 100vw;
    overflow: hidden;
    height: 100vh;
  }
  .backco {
    background: #f8f8f6;
  }
  .slider-control-centerright button {
    font-size: 0;
    width: 60px;
    background: transparent !important;
  }
  .slider-control-centerright button:before {
    content: "";
    position: absolute;
    top: 4px;
    width: 20px;
    border-top: 2px solid #000;
    transform-origin: left;
    transition: all 0.6s ease;
    transform: rotate(135deg);
  }
  .slider-control-centerright button:after {
    content: "";
    position: absolute;
    top: 5px;
    width: 20px;
    border-top: 2px solid #000;
    transform-origin: left;
    transition: all 0.6s ease;
    transform: rotate(-135deg);
  }
  .slider-control-centerleft button {
    font-size: 0;
    width: 60px;
    background: transparent !important;
  }
  .slider-control-centerleft button:before {
    content: "";
    position: absolute;
    top: 4px;
    width: 20px;
    border-top: 2px solid #000;
    transform-origin: left;
    transition: all 0.6s ease;
    transform: rotate(45deg);
  }
  .slider-control-centerleft button:after {
    content: "";
    position: absolute;
    top: 5px;
    width: 20px;
    border-top: 2px solid #000;
    transform-origin: left;
    transition: all 0.6s ease;
    transform: rotate(-45deg);
  }
  button:focus {
    outline: none;
  }
`;

const Backco = styled.div`
  .container {
    padding-left: 30px;
    padding-right: 30px;
    margin-top: 30vh;
  }
  .titleimg {
    width: 35vw;
    float: left;
  }
  img {
    height: 100%;
    width: 100%;
  }
  .titleBox {
    overflow: hidden;
    padding-top: 12%;
    padding-left: 5%;
    word-break: keep-all;
  }
  h2 {
    font-size: 24px;
    margin-bottom: 1rem;
  }

  @media (max-width: 1024px) {
    .container {
      padding-left: 70px;
      padding-right: 70px;
      margin-top: 10%;
    }
    .titleimg {
      width: 70vw;
      float: none;
    }
  }
  @media (max-width: 768px) {
    .container {
      padding-left: 70px;
      padding-right: 70px;
      margin-top: 20vh;
    }
    .titleimg {
      width: 100%;
      float: none;
    }
  }
`;
const HeaderBlock = styled.div`
  position: fixed;
  top: 40vh;
  width: 100%;
  z-index: 100;
  text-align: center;
  color: #fff;
`;

const Wrapper = styled(Responsive)`
  display: inline-block;
  align-items: center;
  color: #fff;
  .logo {
    font-size: 2.6rem;
    font-weight: 800;
    letter-spacing: 2px;
    color: #fff;
    font-family: MaplestoryOTFBold;
  }
  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
  .logo:hover {
    text-decoration: none;
  }
`;

const MainButton = styled(Button)`
  margin-top: 1rem;
  color: rgba(255, 131, 141, 1);
  background-color: #fff;
  margin-right: 2rem;
  padding: 0.4rem 1.7rem;
  border-radius: 50px;

  &:last-child {
    margin-right: 0;
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
      <WelcomeCss>
        <Carousel>
          <div>
            <HeaderBlock>
              <Wrapper>
                <Link to="/" className="logo">
                  KKiri
                </Link>
                <p>우리들만의 커플채팅 웹사이트</p>
                {member ? (
                  <div className="right">
                    <UserInfo>{member.email}</UserInfo>
                    <MainButton onClick={onLogout}>로그아웃</MainButton>
                    {member.coupleShareCode ? null : (
                      <Button to="/connection">코드입력</Button>
                    )}
                  </div>
                ) : (
                  <>
                    <div>
                      <MainButton to="/login">로그인</MainButton>
                      <MainButton to="/register">회원가입</MainButton>
                    </div>
                  </>
                )}
              </Wrapper>
            </HeaderBlock>
            <img className="main1Img" src={img3} alt="" />
          </div>
          <Backco>
            <Container>
              <div class="titleimg">
                <img src={titleimg1} alt="titleimg1" />
              </div>
              <div class="titleBox">
                <h2>언제 어디서나 둘만의 대화!</h2>
                <p>
                  대학생 커플도, 결혼을 앞둔 예비 부부도! PC버전을 사용하여 언제
                  어디서나 연인과의 대화를 이어갈 수 있어요! 모든 자료는
                  암호화되어 철저하게 보호되니, 안심하고 사용하세요
                </p>
                <p>오로지 한 사람과의 대화 기능만 제공합니다. </p>
              </div>
            </Container>
          </Backco>
          <Backco>
            <Container>
              <div class="titleimg">
                <img src={titleimg2} alt="titleimg1" />
              </div>
              <div class="titleBox">
                <h2>기념일부터 스케줄까지 한 번에 확인하세요!</h2>
                <p>
                  서로의 스케줄도, 커플 디데이, 기념일도 확인하세요! 함께 쓰는
                  캘린더와 기념일 자동 계산기까지~ 위젯 기능을 사용하여 사귄
                  날짜나 데이트 일정 디데이를 더 편하게 확인하세요! 기본 기념일
                  일정만 설정해두어도 기록되기 때문에 연인끼리 기념일을 잊어
                  먹을 일은 거의 없을 것으로 생각 됩니다
                </p>
              </div>
            </Container>
          </Backco>
          <Backco>
            <Container>
              <div class="titleimg">
                <img src={titleimg3} alt="titleimg1" />
              </div>
              <div class="titleBox">
                <h2>소중한 추억을 손쉽게 저장하세요!</h2>
                <p>
                  커플 사진첩, 동영상, 다이어리 메모까지! 손쉽게 저장할 수
                  있어요. 휴대폰을 바꿔도 그대로 남아 있어요! 사랑하는 사람과
                  함께 행복했던 순간들을 사진으로 담아 둘만의 공간인 비트윈에서
                  자유롭게 사진을 올리고, 글을 쓰면서 둘만의 잊지 못할 추억들을
                  만들 수 있었습니다. 그러면서 더욱 서로에 대한 애정이 깊어지는
                  걸 느낄 수 있었습니다.
                </p>
              </div>
            </Container>
          </Backco>
        </Carousel>
      </WelcomeCss>
    </>
  );
};

export default Header;
