import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCalendar, setField } from "../../modules/calendar";
import CalendarSide from "../../components/Calendar/CalendarSide";
import {
  changeType,
  renderCalendar,
  togglePopup,
} from "../../modules/tuiCalendar";
import { getDdayList } from "../../modules/dDay";

const CalenderSideContainer = ({ calendars, calendarsError, cal }) => {
  const dispatch = useDispatch();
  const { dDays, dDayError, schedules } = useSelector(({ dDay, schedule }) => {
    // console.log(dDay);
    return {
      dDays: dDay.dDays,
      dDayError: dDay.dDayError,
      schedules: schedule.schedules,
    };
  });

  const handleDeleteButtonClick = (e) => {
    // console.dir('필터 삭제버튼 눌렀다');
    // console.dir(e.target);
    // console.log(e.target.id);
    dispatch(deleteCalendar(e.target.id));
  };

  const handleCalendarFilterClick = (e) => {
    // console.log(calendars);
    const calendarId = e.target.id;
    // console.log(calendarId);
    // console.dir(typeof calendarId);
    dispatch(togglePopup());
    dispatch(changeType("modify"));
    // console.log(calendars);
    const currentCalendar = calendars.find(
      (calendar) => calendar.id === calendarId
    );
    // console.log(currentCalendar);
    dispatch(setField(currentCalendar));
  };

  const handleDdayTitleClick = (e) => {
    const targetDate = new Date(e.target.id);
    dispatch(renderCalendar(targetDate));
    cal.current.calendarInst.setDate(targetDate);
  };

  useEffect(() => {
    dispatch(getDdayList());
  }, [dispatch, schedules]);

  return (
    <CalendarSide
      calendars={calendars}
      error={calendarsError}
      onDelete={handleDeleteButtonClick}
      onModify={handleCalendarFilterClick}
      dDays={dDays}
      dDayError={dDayError}
      onDdayClick={handleDdayTitleClick}
    />
  );
};

export default CalenderSideContainer;
