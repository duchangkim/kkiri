import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import { Form, Alert } from 'react-bootstrap';
import { Input } from 'reactstrap';

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

const Connection = ({ member, form, onChange, onSubmit, errorMessage }) => {
  return (
    <>
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
        <Link to="/login_">
          <span className="ma_le">로그아웃</span>
        </Link>
      </Footer>
    </>
  );
};

export default Connection;
