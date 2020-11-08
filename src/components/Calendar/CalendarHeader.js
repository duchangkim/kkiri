import React from "react";
import styled from "styled-components";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdAdd,
} from "react-icons/md";

const ButtonsBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  height: 5%;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  outline: none;
  border: none;
  background: #ffffff;
  font-size: 2rem;
  color: #999;
  &:hover {
    color: #ff838da0;
  }
  &:focus {
    outline: none;
  }
`;
const TodayButton = styled(Button)`
  margin: 5px 0;
  border-radius: 10px;
  font-size: 1.4rem;
  color: ${(props) => (props.isToday ? "#ff838d" : "#919191")};
  &:hover {
    background: #ff838da0;
    color: #fff;
  }
`;
const CurrentRange = styled.h2`
  width: 200px;
  margin: 0;
  text-align: center;
  font-size: 1.8rem;
  cursor: context-menu;
  color: ${(props) => (props.isToday ? "#ff838d" : "#919191")};
`;
const AddButtonBlock = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 75%;
  height: 100%;
`;
const AddButton = styled(Button)`
  color: #ff838d;

  &:hover + div.msg {
    display: flex;
  }
`;
const Message = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  font-size: 0.9rem;
  font-weight: bold;
  color: #fff;
  background: #ff838d;
  border-radius: 5px;
`;

const CalendarHeader = ({
  onMoveToPrevRange,
  onMoveToNextRange,
  onMoveToToday,
  isToday,
  year,
  month,
  openForm,
}) => {
  return (
    <ButtonsBlock>
      <Button onClick={onMoveToPrevRange}>
        <MdKeyboardArrowLeft />
      </Button>
      <CurrentRange isToday={isToday}>
        {year}년 {month}월
      </CurrentRange>
      <Button onClick={onMoveToNextRange}>
        <MdKeyboardArrowRight />
      </Button>
      <TodayButton onClick={onMoveToToday} isToday={isToday}>
        Today
      </TodayButton>
      <AddButtonBlock>
        <AddButton onClick={openForm}>
          <MdAdd />
        </AddButton>
        <Message className="msg">캘린더 필터 추가</Message>
      </AddButtonBlock>
    </ButtonsBlock>
  );
};

export default CalendarHeader;
