import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from 'react-bootstrap';
const PostActionButtonsBlock = styled.div`
  margin-top: 3rem;
  h2 {
    font-size: 1.3rem;
  }
`;
const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: ${palette.gray[6]};
  font-weight: bold;
  border: none;
  outline: none;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    background: ${palette.gray[1]};
    color: ${palette.cyan[7]};
  }
  & + & {
    margin-left: 0.25rem;
  }
`;

const LogoutForm = ({ onSubmit, onLogout }) => {
  return (
    <PostActionButtonsBlock>
      <Container>
        <form onSubmit={onSubmit}>
          <h2>로그아웃</h2>
          <ActionButton onClick={onLogout} className="logoutbtn">
            로그아웃
          </ActionButton>
        </form>
      </Container>
    </PostActionButtonsBlock>
  );
};

export default LogoutForm;
