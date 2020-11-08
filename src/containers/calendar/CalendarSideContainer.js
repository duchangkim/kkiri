import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCalendar, setField } from '../../modules/calendar';

import CalendarSide from '../../components/Calendar/CalendarSide';
import { changeType, togglePopup } from '../../modules/tuiCalendar';

const CalenderSideContainer = ({ calendars, calendarsError }) => {
  const dispatch = useDispatch();
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

  return (
    <CalendarSide
      calendars={calendars}
      error={calendarsError}
      onDelete={handleDeleteButtonClick}
      onModify={handleCalendarFilterClick}
    />
  );
};

export default CalenderSideContainer;
