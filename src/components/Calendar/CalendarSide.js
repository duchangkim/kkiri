import React from 'react';
import styled from 'styled-components';
import { MdRefresh } from 'react-icons/md';

const CalendarSideBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const ListBlock = styled.div`
  width: 100%;
  height: 50%;

  padding: 0 10px;
  border-left: 1px solid #dfdfdf;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #dfdfdf;
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;

const CalendarBlock = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ColorCircle = styled.div`
  width: ${(props) => (props.small ? `12px` : `17px`)};
  height: ${(props) => (props.small ? `12px` : `17px`)};
  border-radius: 50%;
  background: ${(props) => props.bgColor};
`;
const CalendarTitle = styled.div`
  font-size: 0.9rem;
  width: 50%;
  max-width: 40%;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    font-weight: bold;
    color: ${(props) => props.bgColor};
  }
`;
const DdayBlock = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  div.top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const DdayTitle = styled.div`
  width: 80%;
  font-size: 0.9rem;
  text-align: center;
  overflow: hidden;
  cursor: pointer;
`;
const Dday = styled.div`
  font-weight: bold;
`;
const DeleteButtonBlock = styled.div`
  width: 30%;
  text-align: right;
  font-size: 1.2rem;

  button {
    border: none;
    background: none;
    outline: none;
    color: #aeaeae;
    &:hover {
      color: #f16b6f;
    }
    & svg {
      z-index: -10;
    }
  }
`;
const BlockHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 35px;
  border-bottom: 1px solid #dfdfdf;
  text-align: center;
`;
const ErrorBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 50%;

  padding: 0 10px;
  border-left: 1px solid #dfdfdf;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #dfdfdf;
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;
const ErrorMsg = styled.div`
  text-align: center;
`;
const RefreshButton = styled.div`
  font-size: 1.5rem;
  color: #777;
  margin-bottom: 60px;

  &:hover {
    color: #f16b6f;
  }
`;

const CalendarSide = ({ calendars, error, onDelete, onModify, dDay }) => {
  return (
    <CalendarSideBlock>
      {error ? (
        <ErrorBlock>
          <BlockHeader>캘린더 필터</BlockHeader>
          <ErrorMsg>캘린더 필터를 불러오는 중 오류가 발생했습니다.</ErrorMsg>
          <RefreshButton className="btn">
            <MdRefresh />
          </RefreshButton>
        </ErrorBlock>
      ) : (
        <ListBlock>
          <BlockHeader>캘린더 필터</BlockHeader>
          {calendars.map((calendar) => {
            if (calendar.id === 'dday') {
              return null;
            }
            return (
              <CalendarBlock key={calendar.id}>
                <ColorCircle bgColor={calendar.bgColor} />
                <CalendarTitle
                  id={calendar.id}
                  bgColor={calendar.bgColor}
                  onClick={onModify}
                >
                  {calendar.name}
                </CalendarTitle>
                <DeleteButtonBlock>
                  <button value={calendar.id} onClick={onDelete}>
                    X
                  </button>
                </DeleteButtonBlock>
              </CalendarBlock>
            );
          })}
        </ListBlock>
      )}

      <ListBlock>
        <BlockHeader>디데이</BlockHeader>
        <DdayBlock>
          <div className="top">
            <ColorCircle bgColor="#b291ff" small />
            <DdayTitle>크리스마스</DdayTitle>
          </div>
          <Dday>D-17일</Dday>
        </DdayBlock>
      </ListBlock>
    </CalendarSideBlock>
  );
};

export default CalendarSide;
