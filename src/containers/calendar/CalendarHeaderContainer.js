import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  moveToNextRange,
  moveToPrevRange,
  moveToToday,
  togglePopup,
  changeType,
} from '../../modules/tuiCalendar';
import { initializeForm } from '../../modules/calendar';
import CalendarHeader from '../../components/Calendar/CalendarHeader';

const CalendarHeaderContainer = ({ cal }) => {
  const { year, month, isToday, isOpen } = useSelector(
    ({ tuiCalendar }) => ({
      year: tuiCalendar.currentRange.year,
      month: tuiCalendar.currentRange.month,
      isToday: tuiCalendar.currentRange.isToday,
      isOpen: tuiCalendar.calendarDataFormPopup.isOpen,
    }),
    shallowEqual
  );
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

  // Props는 on접두사
  // function name에는 handle접두사
  const handleAddButtonClick = (e) => {
    console.log('+btn click');

    dispatch(changeType('create'));
    dispatch(initializeForm());
    dispatch(togglePopup());
  };

  return (
    <CalendarHeader
      onMoveToNextRange={onMoveToNextRange}
      onMoveToPrevRange={onMoveToPrevRange}
      onMoveToToday={onMoveToToday}
      year={year}
      month={month}
      isToday={isToday}
      onOpenForm={handleAddButtonClick}
      isOpen={isOpen}
    />
  );
};

export default CalendarHeaderContainer;
