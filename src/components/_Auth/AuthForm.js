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
      <NaviMessage>
        <span className="m-3">{textMap[type]}</span>
      </NaviMessage>
      <form onSubmit={onSubmit}>
        <Container>
          <Form.Group>
            <Input
              name="email"
              value={form.email}
              onChange={onChange}
              required
              placeholder="아이디 (이메일)"
            />
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
              <Form.Group>
                <Input
                  name="emailAuthenticationCode"
                  value={form.emailAuthenticationCode}
                  onChange={onChange}
                  required
                  placeholder="이메일 인증번호"
                />
              </Form.Group>
            </>
          )}
          <Form.Group>
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              required
              placeholder="비밀번호"
            />
          </Form.Group>
          {type === 'register' && (
            <>
              <Form.Group>
                <Input
                  type="password"
                  name="passwordConfirm"
                  value={form.passwordConfirm}
                  onChange={onChange}
                  required
                  placeholder="비밀번호 확인"
                />
              </Form.Group>
              <Form.Group>
                <Input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  placeholder="이름"
                />
              </Form.Group>
              <Form.Group>
                <Input
                  type="date"
                  name="birthday"
                  value={form.birthday}
                  onChange={onChange}
                  required
                  placeholder="생년월일 (yyyy-mm-dd)"
                />
              </Form.Group>
              <Form.Group>
                <Input
                  name="hp"
                  value={form.hp}
                  onChange={onChange}
                  required
                  placeholder="전화번호 (010-xxxx-xxxx)"
                />
              </Form.Group>
              {authErrorMessage && (
                <Alert variant="danger">{authErrorMessage}</Alert>
              )}
            </>
          )}
          <button className="btn btn-primary btn-block">{textMap[type]}</button>
        </Container>
      </form>
      <Footer>
        {type === 'login' ? (
          <>
            <Link to="/findid">
              <span className="ma_ra">아이디 / 비밀번호 찾기</span>
            </Link>
            <Link to="/register_">
              <span className="ma_le">회원가입</span>
            </Link>
          </>
        ) : type === 'registercouple' ? null : (
          <Link to="/login_">
            <span className="ma_le">로그인</span>
          </Link>
        )}
      </Footer>
    </>
  );
};

export default AuthForm;
