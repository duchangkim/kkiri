import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Container, Form, Alert } from 'react-bootstrap';
import { Input } from 'reactstrap';

const ConnectionForm = styled.div`
  text-align: center;
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

const Connection = ({
  member,
  form,
  onChange,
  onSubmit,
  errorMessage,
  onLogout,
}) => {
  return (
    <Container>
      <ConnectionForm>
        <form onSubmit={onSubmit}>
          <div className="couplediv">
            <p>*내 고유번호를 상대방에게 공유*</p>
            <h1>{member.userCode}</h1>
            <p className="as">상대방이 연결에 성공하면 새로고침 해주세요</p>
            <Form.Group controlId="formBasicEmail" className="login_form">
              <Input
                name="otherUserCode"
                placeholder="상대방 고유번호"
                onChange={onChange}
                value={form.otherUserCode}
                required
              />
              <span className="content_name pl-1 pr-1">상대방 고유번호</span>
            </Form.Group>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <button className="btn btn-primary btn-block">연결</button>
          </div>
        </form>
        <Footer>
          <span onClick={onLogout} className="ma_le">
            로그아웃
          </span>
        </Footer>
      </ConnectionForm>
    </Container>
  );
};

export default Connection;
