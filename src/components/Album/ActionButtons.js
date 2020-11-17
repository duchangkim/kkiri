import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AskRemoveModal from './AskRemoveModal'
import { BsHeartFill, BsHeart } from "react-icons/bs";

const UpdBlock = styled.div`
    width: 70%;
    padding-top: 40px;
    text-align: center;
    margin: 0 auto;
`

const ActionButton = styled.button`
    border: none;
    border-radius: 4px;
    width: 47%;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: white;
    outline: none;
    cursor: pointer;
    background: #ffb6c1;

    &:hover {
        background: #ff4d67;
    }

    & + & {
      margin-left: 0.75rem;
    }
`

const ActionButtons = ({ onRemove, onEdit, likes }) => {
  const [modal, setModal] = useState(false);

  const [like, setLike] = useState(
    ''
  );

  useEffect(() => {
    setLike(likes ? '즐찾해제' : '즐찾ㄱ');
  },[likes])
  const onRemoveClick = () => {
    setModal(true);
  }
  const onCancel = () => {
    setModal(false);
  }
  const onConfirm = () => {
    setModal(false);
    onRemove();
  }

  console.log('ㅇㄴㄹㄴㅇㄹ여깅기이기~~ : ' + likes);
  return (
    <>
      <UpdBlock>
        <ActionButton onClick={onEdit}>
          {like}
        </ActionButton>
        <ActionButton onClick={onRemoveClick}>삭제</ActionButton>
        {likes ? 
        <div><BsHeartFill color='red'/></div> 
        : 
        <div><BsHeartFill color='black'/></div>
        }
      </UpdBlock>
      <AskRemoveModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  )
}

export default ActionButtons;