import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Image, Form } from 'react-bootstrap';
import { Input } from 'reactstrap';

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }

  // 간편 로그인 버튼
  .login_box {
    margin: 5% 0;
  }
  .api_img {
    width: 80%;
    border-radius: 6px;
  }

  .kep-login-facebook {
    font-size: 0;
    background-image: url(../images/fackbookicon.png) !important;
  }
  .login_form {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .login_form p {
    position: relative;
    width: 100%;
    margin-bottom: 12px;
  }
  .content_name {
    display: none;
  }
  input:focus + .content_name,
  input:valid + .content_name {
    position: absolute;
    top: -10px;
    left: 16px;
    background: #ffffff;
    font-size: 13px;
    font-weight: bold;
    color: #f58cb4;
    display: inline;
  }
  .form-control {
    padding: 1.3rem;
  }
  .form-control:focus {
    border: 2px solid #f58cb4;
    box-shadow: none;
  }
  input:focus::-webkit-input-placeholder {
    color: transparent;
  }
  .emailbtn {
    color: #f58cb4;
    margin-bottom: 1rem;
    width: 100%;
    font-size: 1.125rem;
    border: 1px solid #f58cb4;
    background: #fff;
    &:hover {
      background: #f58cb49d;
    }
    &:focus {
      outline: none;
      border: 2px dotted #f58cb4;
      border-radius: 4px;
    }
  }
  p {
    text-align: center;
  }
`;

const Hrsect = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  font-size: 15px;
  margin: 8px 0px;

  &:before,
  &:after {
    content: '';
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
  .ma_le {
    margin-left: 49.3%;
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const textMap = {
  login: '로그인',
  register: '회원가입',
  registercode: '코드 확인',
  registeremail: '코드 보내기',
  registercouple: '커플 코드확인',
};

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const AuthForm = ({
  member,
  type,
  form,
  onChange,
  onSubmit,
  error,
  myCode,
}) => {
  console.log(`myCode 커플코드페이지콘솔 값 : ${myCode}`);
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <Container>
        <form onSubmit={onSubmit}>
          {type === 'login' && (
            <Hrsect>
              <span className="m-3">간편 로그인</span>
            </Hrsect>
          )}
          {type === 'login' && (
            <Row className="login_box">
              <Col xs={3} md={3}>
                <div className="apidiv">
                  <p>
                    <a href="/auth/facebook">
                      <Image
                        src={require('../images/fackbookicon.png')}
                        className="api_img"
                      />
                    </a>
                  </p>
                </div>
              </Col>
              <Col xs={3} md={3}>
                <div className="apidiv">
                  <p>
                    <a href="/auth/naver">
                      <Image
                        src={require('../images/navericon.png')}
                        className="api_img"
                      />
                    </a>
                  </p>
                </div>
              </Col>
              <Col xs={3} md={3}>
                <div className="apidiv">
                  <p>
                    <a href="/auth/google">
                      <Image
                        src={require('../images/googleicon.png')}
                        className="api_img"
                      />
                    </a>
                  </p>
                </div>
              </Col>
              <Col xs={3} md={3}>
                <div className="apidiv">
                  <Image
                    src={require('../images/kakaoicon.png')}
                    className="api_img"
                  />
                </div>
              </Col>
            </Row>
          )}
          {type === 'login' && (
            <Hrsect>
              <span className="m-3">이메일 로그인</span>
            </Hrsect>
          )}
          {member && (
            <div className="right">
              <Hrsect>{member.email}</Hrsect>
            </div>
          )}
          {type === 'registercode' || type === 'registercouple' ? null : (
            <Form.Group controlId="formBasicEmail" className="login_form">
              <Input
                autoComplate="email"
                name="email"
                placeholder="아이디(이메일)"
                onChange={onChange}
                value={form.email}
                required
              />
              <span className="content_name pl-1 pr-1">아이디(이메일)</span>
            </Form.Group>
          )}
          {type === 'registercode' && (
            <Form.Group controlId="formBasicEmail" className="login_form">
              <Input
                autoComplate="emailcode"
                name="emailcode"
                placeholder="코드 입력"
                onChange={onChange}
                value={form.emailcode}
                required
              />
              <span className="content_name pl-1 pr-1">이메일 인증 번호</span>
            </Form.Group>
          )}
          {type === 'registercode' ||
          type === 'registeremail' ||
          type === 'registercouple' ? null : (
            <Form.Group controlId="formBasicPassword" className="login_form">
              <Input
                autoComplate="new-password"
                name="password"
                placeholder="비밀번호"
                type="password"
                onChange={onChange}
                value={form.password}
                required
              />
              <span className="content_name pl-1 pr-1">비밀번호</span>
            </Form.Group>
          )}
          {type === 'register' && (
            <Form.Group controlId="formBasicPassword" className="login_form">
              <Input
                autoComplate="new-password"
                name="passwordConfirm"
                placeholder="비밀번호 확인"
                type="password"
                onChange={onChange}
                value={form.passwordConfirm}
                required
              />
              <span className="content_name pl-1 pr-1">비밀번호 확인</span>
            </Form.Group>
          )}
          {type === 'register' && (
            <Form.Group controlId="formBasicEmail" className="login_form">
              <Input
                autoComplate="name"
                name="name"
                placeholder="이름"
                onChange={onChange}
                value={form.name}
                required
              />
              <span className="content_name pl-1 pr-1">이름</span>
            </Form.Group>
          )}
          {type === 'register' && (
            <Form.Group controlId="formBasicEmail" className="login_form">
              <Input
                autoComplate="birthday"
                name="birthday"
                placeholder="년 월 일"
                onChange={onChange}
                value={form.birthday}
                required
              />
              <span className="content_name pl-1 pr-1">생년 월 일</span>
            </Form.Group>
          )}
          {type === 'register' && (
            <Form.Group controlId="formBasicEmail" className="login_form">
              <Input
                autoComplate="hp"
                name="hp"
                placeholder="전화번호"
                onChange={onChange}
                value={form.hp}
                required
              />
              <span className="content_name pl-1 pr-1">전화번호</span>
            </Form.Group>
          )}
          {type === 'registercouple' && (
            <>
              <h1>{myCode}</h1>
              <Form.Group controlId="formBasicEmail" className="login_form">
                <Input
                  autoComplate="couplecode"
                  name="couplecode"
                  placeholder="커플 코드"
                  onChange={onChange}
                  value={form.couplecode}
                  required
                />
                <span className="content_name pl-1 pr-1">커플 코드</span>
              </Form.Group>
            </>
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <ButtonWithMarginTop cyan fullWidth style={{ marginTop: '1rem ' }}>
            {text}
          </ButtonWithMarginTop>
        </form>
        <Footer>
          {type === "login" && <Link to="/findid">아이디 / 비밀번호 찾기</Link>}
          {type === "login" ? (
            <Link to="/registeremail">
              <span className="ma_le">회원가입</span>
            </Link>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </Footer>
      </Container>
    </AuthFormBlock>
  );
};

export default AuthForm;
