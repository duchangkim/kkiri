import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Input } from 'reactstrap';

const NaviMessage = styled.div`
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

  .btn-primary {
    color: #fff;
    background-color: rgba(255, 131, 141, 1);
    border-color: rgba(255, 131, 141, 1);
  }
  .btn-primary.focus,
  .btn-primary:focus {
    color: #fff;
    background-color: rgba(255, 131, 141, 1) !important;
    border-color: rgba(255, 131, 141, 1) !important;
    box-shadow: 0 0 0 0.2rem rgb(255 131 141 / 38%) !important;
  }
`;
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    &:hover {
      color: ${palette.gray[9]};
    }
  }
  .ma_ra {
    float: left;
    text-decoration: underline;
  }
  .ma_le {
    float: right;
    text-decoration: underline;
  }

  .logoutbtn {
    background: none;
    color: ${palette.gray[6]};
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const textMap = {
  login: '로그인',
  register: '회원 가입',
  registercouple: '커플코드 확인',
};

const AuthForm = ({
  type,
  form,
  onChange,
  onSubmit,
  onSendButtonClick,
  emailErrorMessage,
  emailSendMessage,
  authErrorMessage,
}) => {
  return (
    <>
      <Container>
        <NaviMessage>
          <span className="m-3">{textMap[type]}</span>
        </NaviMessage>
        <form onSubmit={onSubmit}>
          <AuthFormBlock>
            <Form.Group className="login_form">
              <Input
                name="email"
                value={form.email}
                onChange={onChange}
                required
                placeholder="아이디 (이메일)"
              />

              <span className="content_name pl-1 pr-1">아이디 (이메일)</span>
            </Form.Group>
            {type === 'register' && (
              <>
                <Form.Group>
                  <Button variant="primary" block onClick={onSendButtonClick}>
                    인증번호 발송
                  </Button>
                </Form.Group>
                {emailErrorMessage && (
                  <Alert variant="danger">{emailErrorMessage}</Alert>
                )}
                {emailSendMessage && (
                  <Alert variant="success">{emailSendMessage}</Alert>
                )}
                <Form.Group className="login_form">
                  <Input
                    name="emailAuthenticationCode"
                    value={form.emailAuthenticationCode}
                    onChange={onChange}
                    required
                    placeholder="이메일 인증번호"
                  />

                  <span className="content_name pl-1 pr-1">
                    이메일 인증번호
                  </span>
                </Form.Group>
              </>
            )}
            <Form.Group className="login_form">
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                required
                placeholder="비밀번호"
              />

              <span className="content_name pl-1 pr-1">비밀번호</span>
            </Form.Group>
            {type === 'register' && (
              <>
                <Form.Group className="login_form">
                  <Input
                    type="password"
                    name="passwordConfirm"
                    value={form.passwordConfirm}
                    onChange={onChange}
                    required
                    placeholder="비밀번호 확인"
                  />

                  <span className="content_name pl-1 pr-1">비밀번호 확인</span>
                </Form.Group>
                <Form.Group className="login_form">
                  <Input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                    placeholder="이름"
                  />
                  <span className="content_name pl-1 pr-1">이름</span>
                </Form.Group>
                <Form.Group className="login_form">
                  <Input
                    type="date"
                    name="birthday"
                    value={form.birthday}
                    onChange={onChange}
                    required
                    placeholder="생년월일 (yyyy-mm-dd)"
                  />
                  <span className="content_name pl-1 pr-1">
                    생년월일 (yyyy-mm-dd)
                  </span>
                </Form.Group>
                <Form.Group className="login_form">
                  <Input
                    name="hp"
                    value={form.hp}
                    onChange={onChange}
                    required
                    placeholder="전화번호 (010-xxxx-xxxx)"
                  />

                  <span className="content_name pl-1 pr-1">
                    전화번호 (010-xxxx-xxxx)
                  </span>
                </Form.Group>
              </>
            )}
            {authErrorMessage && (
              <Alert variant="danger">{authErrorMessage}</Alert>
            )}
            <button className="btn btn-primary btn-block">
              {textMap[type]}
            </button>
          </AuthFormBlock>
        </form>
        <Footer>
          {type === 'login' ? (
            <>
              <Link to="/findid">
                <span className="ma_ra">아이디 / 비밀번호 찾기</span>
              </Link>
              <Link to="/register">
                <span className="ma_le">회원가입</span>
              </Link>
            </>
          ) : type === 'registercouple' ? null : (
            <Link to="/login">
              <span className="ma_le">로그인</span>
            </Link>
          )}
        </Footer>
      </Container>
    </>
  );
};

export default AuthForm;
