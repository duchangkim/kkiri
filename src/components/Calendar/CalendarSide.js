import React from 'react';
import styled from 'styled-components';
import { FiTrash2 } from 'react-icons/fi';
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
const CalendarColorCircle = styled.div`
  width: 20px;
  height: 20px;
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
const DeleteButton = styled.div`
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

const CalendarSide = ({ calendars, error, onDelete }) => {
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
          {calendars.map((calendar) => (
            <CalendarBlock key={calendar.id}>
              <CalendarColorCircle bgColor={calendar.bgColor} />
              <CalendarTitle bgColor={calendar.bgColor}>
                {calendar.name}
              </CalendarTitle>
              <DeleteButton value={calendar.id} onClick={onDelete}>
                <button>
                  <FiTrash2 />
                </button>
              </DeleteButton>
            </CalendarBlock>
          ))}
        </ListBlock>
      )}

      <ListBlock>
        <BlockHeader>디데이</BlockHeader>
      </ListBlock>
    </CalendarSideBlock>
  );
};

export default CalendarSide;
