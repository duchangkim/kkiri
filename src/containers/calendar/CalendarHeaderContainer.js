import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  moveToNextRange,
  moveToPrevRange,
  moveToToday,
} from "../../modules/tuiCalendar";
import CalendarHeader from "../../components/Calendar/CalendarHeader";

const CalendarHeaderContainer = ({ cal }) => {
  const { year, month, isToday } = useSelector(({ tuiCalendar }) => ({
    year: tuiCalendar.year,
    month: tuiCalendar.month,
    isToday: tuiCalendar.isToday,
  }));
  const dispatch = useDispatch();

  const onMoveToNextRange = () => {
    dispatch(moveToNextRange(cal.current));
  };
  const onMoveToPrevRange = () => {
    dispatch(moveToPrevRange(cal.current));
  };
  const onMoveToToday = () => {
    dispatch(moveToToday(cal.current));
  };
  return (
    <CalendarHeader
      onMoveToNextRange={onMoveToNextRange}
      onMoveToPrevRange={onMoveToPrevRange}
      onMoveToToday={onMoveToToday}
      year={year}
      month={month}
      isToday={isToday}
    />
  );
};

export default CalendarHeaderContainer;
