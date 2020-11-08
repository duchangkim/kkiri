import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  moveToNextRange,
  moveToPrevRange,
  moveToToday,
} from "../../modules/tuiCalendar";
import CalendarHeader from "../../components/Calendar/CalendarHeader";

const CalendarHeaderContainer = ({ cal }) => {
  const [popupPosition, setpopupPosition] = useState();
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

  const openForm = (e) => {
    console.log("+btn click");
    const position = e.target.getBoundingClientRect();
    console.dir(position);
    setpopupPosition({
      right: position.right,
      top: position.top,
    });
  };

  return (
    <CalendarHeader
      onMoveToNextRange={onMoveToNextRange}
      onMoveToPrevRange={onMoveToPrevRange}
      onMoveToToday={onMoveToToday}
      year={year}
      month={month}
      isToday={isToday}
      openForm={openForm}
      popupPosition={popupPosition}
    />
  );
};

export default CalendarHeaderContainer;
