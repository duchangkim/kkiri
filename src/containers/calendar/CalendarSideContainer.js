import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCalendar, setField } from '../../modules/calendar';

import CalendarSide from '../../components/Calendar/CalendarSide';
import { changeType, togglePopup } from '../../modules/tuiCalendar';
import { getDdayList } from '../../modules/dDay';

const CalenderSideContainer = ({ calendars, calendarsError }) => {
  const dispatch = useDispatch();
  const { dDays, dDayError } = useSelector(({ dDay }) => {
    console.log(dDay);
    return {
      dDays: dDay.dDays,
      dDayError: dDay.dDayError,
    };
  });

  const handleDeleteButtonClick = (e) => {
    console.dir(e.target);
    console.log(e.target.value);
    dispatch(deleteCalendar(e.target.value));
  };

  const handleCalendarFilterClick = (e) => {
    console.log(calendars);
    const calendarId = e.target.id;
    console.log(calendarId);
    // console.dir(typeof calendarId);
    dispatch(togglePopup());
    dispatch(changeType('modify'));
    // console.log(calendars);
    const currentCalendar = calendars.find(
      (calendar) => calendar.id === calendarId
    );
    console.log(currentCalendar);
    dispatch(setField(currentCalendar));
  };

  useEffect(() => {
    dispatch(getDdayList());
  }, [dispatch]);

  return (
    <CalendarSide
      calendars={calendars}
      error={calendarsError}
      onDelete={handleDeleteButtonClick}
      onModify={handleCalendarFilterClick}
      dDays={dDays}
      dDayError={dDayError}
    />
  );
};

export default CalenderSideContainer;
