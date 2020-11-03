import React, { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getScheduleList,
  createSchedule,
  deleteSchedule,
  modifySchedule,
} from "../../modules/schedule";
import serializeSchedule from "../../lib/serializeSchedule";

import TUICalendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import styled from "styled-components";
import CalendarHeaderContainer from "./CalendarHeaderContainer";
import CalenderSideContainer from "./CalendarSideContainer";

const Styles = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  .left {
    width: 85%;
  }
  .left + div {
    width: 15%;
  }
`;

const calendars = [
  {
    id: "1",
    name: "기념일",
    color: "#ffffff",
    bgColor: "#ff838d",
    dragBgColor: "#ff838d",
    borderColor: "#ff838d",
  },
  {
    id: "2",
    name: "여행",
    color: "#ffffff",
    bgColor: "#00a9ff",
    dragBgColor: "#00a9ff",
    borderColor: "#00a9ff",
  },
];

const CalendarContainer = () => {
  const dispatch = useDispatch();
  const { schedules, scheduleError } = useSelector(({ schedule }) => {
    console.log(schedule);
    return {
      schedules: schedule.schedules,
      scheduleError: schedule.scheduleError,
    };
  });

  const cal = useRef(null);

  const onClickSchedule = useCallback((e) => {
    console.dir(`clicked schedule`);
    const { calendarId, id } = e.schedule;
    const el = cal.current.calendarInst.getElement(id, calendarId);

    console.log(e, el.getBoundingClientRect());
  }, []);

  const onBeforeCreateSchedule = useCallback(
    (scheduleData) => {
      console.log("스케쥴 만들거임 버튼 클릭");
      // 스케쥴 직렬화
      const schedule = serializeSchedule(scheduleData);

      // console.log(schedule.start instanceof Date);

      dispatch(createSchedule(schedule)); //db에 저장

      cal.current.calendarInst.createSchedules([schedule]);
    },
    [dispatch]
  );

  const onBeforeDeleteSchedule = useCallback(
    (res) => {
      console.log(`call Delete  ${res}`);
      const { id, calendarId } = res.schedule;

      dispatch(deleteSchedule(id));
      cal.current.calendarInst.deleteSchedule(id, calendarId);
    },
    [dispatch]
  );

  const onBeforeUpdateSchedule = useCallback(
    (e) => {
      console.log(`call Update  ${e}`);
      const { id, calendarId } = e.schedule;
      const schedule = {
        id,
        ...e.changes,
        start: e.changes.start ? e.changes.start.toDate() : null,
        end: e.changes.end ? e.changes.end.toDate() : null,
        category: e.changes.isAllDay ? "allDay" : "time",
      };

      dispatch(modifySchedule(schedule, id));
      cal.current.calendarInst.updateSchedule(id, calendarId, schedule);
    },
    [dispatch]
  );

  const _getFormattedTime = (time) => {
    const date = new Date(time);
    const h = date.getHours();
    const m =
      date.getMinutes() / 10 < 1 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${h}:${m}`;
  };

  const _getTimeTemplate = (schedule, isAllday) => {
    let html = [];

    if (!isAllday) {
      html.push(
        `<strong>${_getFormattedTime(schedule.start)} ~ ${_getFormattedTime(
          schedule.end
        )}</strong>`
      );
    }
    if (schedule.isPrivate) {
      html.push('<sapn class="calendar-font-icon ic-lock-b"></sapn>');
      html.push(" Private");
    } else {
      if (schedule.isReadOnly) {
        html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
      } else if (schedule.recurrenceRule) {
        html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
      } else if (schedule.attendees.length) {
        html.push('<span class="calendar-font-icon ic-user-b"></span>');
      } else if (schedule.location) {
        html.push('<span class="calendar-font-icon ic-location-b"></span>');
      }
      html.push(" " + schedule.title);
    }
    return html.join("");
  };

  const template = {
    time: (schedule) => {
      return _getTimeTemplate(schedule, false);
    },
  };

  useEffect(() => {
    console.log("렌더");
    dispatch(getScheduleList());
  }, [dispatch]);

  if (scheduleError) {
    return <Styles> ERROR! </Styles>;
  }

  return (
    <Styles>
      <div className="left">
        <CalendarHeaderContainer cal={cal} />
        <TUICalendar
          ref={cal}
          height="93%"
          view="month"
          useCreationPopup={true}
          useDetailPopup={true}
          template={template}
          calendars={calendars}
          schedules={schedules}
          onClickSchedule={onClickSchedule}
          onBeforeCreateSchedule={onBeforeCreateSchedule}
          onBeforeDeleteSchedule={onBeforeDeleteSchedule}
          onBeforeUpdateSchedule={onBeforeUpdateSchedule}
        />
      </div>
      <CalenderSideContainer />
    </Styles>
  );
};

export default CalendarContainer;
