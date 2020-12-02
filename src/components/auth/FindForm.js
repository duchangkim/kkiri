import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../common/Button';
import { Container, Form, Alert } from 'react-bootstrap';
import { Input } from 'reactstrap';

const FindFormBlock = styled.div`
  text-align: center;
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
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
  h1 {
    font-size: 28px;
  }
  p {
    margin-bottom: 2px;
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
  .alert {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
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
`;

const textMap = {
  findid: '아이디 찾기',
  findpw: '비밀번호 찾기',
};

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

const FindForm = ({ type, form, onChange, onSubmit, error, myEmail }) => {
  const text = textMap[type];
  return (
    <Container>
      <FindFormBlock>
        <NaviMessage>
          <span className="m-3">{textMap[type]}</span>
        </NaviMessage>
        <form onSubmit={onSubmit}>
          {type === 'findpw' && (
            <>
              <Form.Group controlId="formBasicEmail" className="login_form">
                <Input
                  name="email"
                  placeholder="아이디(이메일)"
                  onChange={onChange}
                  value={form.email}
                  required
                />
                <span className="content_name pl-1 pr-1">아이디(이메일)</span>
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="login_form">
                <Input
                  type="date"
                  autoComplate="birthday"
                  name="birthday"
                  onChange={onChange}
                  value={form.birthday}
                  required
                />
                <span className="content_name pl-1 pr-1">생년 월 일</span>
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="login_form">
                <Input
                  name="hp"
                  placeholder="전화번호"
                  onChange={onChange}
                  value={form.hp}
                  required
                />
                <span className="content_name pl-1 pr-1">전화번호</span>
              </Form.Group>
            </>
          )}
          {type === 'registercode' && (
            <Form.Group controlId="formBasicEmail" className="login_form">
              <Input
                name="emailcode"
                placeholder="코드 입력"
                onChange={onChange}
                value={form.emailcode}
                required
              />
              <span className="content_name pl-1 pr-1">이메일 인증 번호</span>
            </Form.Group>
          )}
          {type === 'findid' && (
            <>
              <Form.Group controlId="formBasicEmail" className="login_form">
                <Input
                  name="name"
                  placeholder="이름"
                  onChange={onChange}
                  value={form.name}
                  required
                />
                <span className="content_name pl-1 pr-1">이름</span>
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="login_form">
                <Input
                  type="date"
                  name="birthday"
                  placeholder="년 월 일"
                  onChange={onChange}
                  value={form.birthday}
                  required
                />
                <span className="content_name pl-1 pr-1">생년 월 일</span>
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="login_form">
                <Input
                  name="hp"
                  placeholder="전화번호"
                  onChange={onChange}
                  value={form.hp}
                  required
                />
                <span className="content_name pl-1 pr-1">전화번호</span>
              </Form.Group>
            </>
          )}
          {error && <Alert>{error}</Alert>}
          {type === 'findresult' ? null : (
            <Button cyan fullWidth>
              {text}
            </Button>
          )}
        </form>

        {type === 'findresult' && (
          <>
            <p>회원님의 아이디는</p>
            <h1>{myEmail}</h1>
            <p>입니다.</p>
            <Footer>
              <Link to="/findpw">
                <span className="ma_ra">비밀번호 찾기</span>
              </Link>
              <Link to="/login">
                <span className="ma_le">로그인</span>
              </Link>
            </Footer>
          </>
        )}
        <Footer>
          {type === 'findid' && (
            <Link to="/findpw">
              <span className="ma_ra">비밀번호 찾기</span>
            </Link>
          )}
          {type === 'findpw' && (
            <Link to="/findid">
              <span className="ma_ra">아이디 찾기</span>
            </Link>
          )}
          {type === 'findresult' ? null : (
            <Link to="/login">
              <span className="ma_le">로그인</span>
            </Link>
          )}
        </Footer>
      </FindFormBlock>
    </Container>
  );
};

export default FindForm;
