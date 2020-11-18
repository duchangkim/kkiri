import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../lib/styles/palette";
import Button from "../common/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Form } from "react-bootstrap";
import { Input } from "reactstrap";

const SetUpFormBlock = styled.div`
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

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const textMap = {
  changepassword: "비밀번호 변경",
};

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const PasswordForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];
  return (
    <SetUpFormBlock>
      <Container>
        <form onSubmit={onSubmit}>
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
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <ButtonWithMarginTop cyan fullWidth style={{ marginTop: "1rem " }}>
            {text}
          </ButtonWithMarginTop>
        </form>
        <Footer>
          <Link to="/login">
            <span className="ma_le">로그인</span>
          </Link>
        </Footer>
      </Container>
    </SetUpFormBlock>
  );
};

export default PasswordForm;
