import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import AskRemoveModal from './AskRemoveModal';
import { Container } from "react-bootstrap";

const PostActionButtonsBlock = styled.div`
margin-top: 3rem;
margin: 50% 45%;
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

const MemberDeleteButtons = ({ onRemove }) => {
  
  const [modal, setModal] = useState(false);
  const onRemoveClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = () => {
    setModal(false);
    onRemove();
    console.log("여기엔 드러와?");
  };

  return (
    <>
      <PostActionButtonsBlock>
      <Container>
        <ActionButton onClick={onRemoveClick}>회원 탈퇴</ActionButton>
      </Container>
      </PostActionButtonsBlock>
      <AskRemoveModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
};

export default MemberDeleteButtons;
