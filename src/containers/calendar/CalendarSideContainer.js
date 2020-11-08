import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCalendarList } from '../../modules/calendar';

import CalendarSide from '../../components/Calendar/CalendarSide';

const CalenderSideContainer = ({ calendars, calendarsError }) => {
  const onDelete = (e) => {
    console.dir(e.target);
    console.log(e.target.value);
  };

  return (
    <CalendarSide
      calendars={calendars}
      error={calendarsError}
      onDelete={onDelete}
    />
  );
};

export default CalenderSideContainer;
