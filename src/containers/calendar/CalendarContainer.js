import React, { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScheduleList, createSchedule } from "../../modules/schedule";
import serializeSchedule from "../../lib/serializeSchedule";

import TUICalendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import styled from "styled-components";
import CalendarHeaderContainer from "./CalendarHeaderContainer";

const Styles = styled.div`
  width: 100%;
  height: 100%;
`;

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));
console.log(`start: ${start} end: ${end}`);
// const schedules = [
//   {
//     calendarId: "1",
//     category: "time",
//     isVisible: true,
//     title: "Study",
//     id: "1",
//     body: "Test",
//     start,
//     end,
//   },
//   {
//     calendarId: "2",
//     category: "time",
//     isVisible: true,
//     title: "Meeting",
//     id: "2",
//     body: "Description",
//     start: new Date(),
//     end: new Date(new Date().setDate(start.getDate() + 1)),
//   },
//   {
//     calendarId: "1",
//     category: "allday",
//     isVisible: true,
//     title: "테스트 일정 3",
//     id: "3",
//     body: "Description",
//     start: new Date(new Date().setDate(start.getDate() + 5)),
//     end: new Date(new Date().setDate(start.getDate() + 7)),
//   },
// ];
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
    console.dir(cal.current);

    console.log(e, el.getBoundingClientRect());
  }, []);

  const onBeforeCreateSchedule = useCallback(
    (scheduleData) => {
      console.log("스케쥴 만들거임 버튼 클릭");
      // 스케쥴 직렬화
      const schedule = serializeSchedule(scheduleData);
      dispatch(createSchedule(schedule)); //db에 저장

      cal.current.calendarInst.createSchedules([schedule]);
      // console.log(schedule);
    },
    [dispatch]
  );

  const onBeforeDeleteSchedule = useCallback((res) => {
    console.log(`call Delete  ${res}`);
    const { id, calendarId } = res.schedule;

    cal.current.calendarInst.deleteSchedule(id, calendarId);
  }, []);

  const onBeforeUpdateSchedule = useCallback((e) => {
    console.log(`call Update  ${e}`);
    const { schedule, changes } = e;

    console.log(schedule);
    console.log(changes);

    cal.current.calendarInst.updateSchedule(
      schedule.id,
      schedule.calendarId,
      changes
    );
  }, []);

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
    dispatch(getScheduleList());
  }, [dispatch]);

  if (scheduleError) {
    return <Styles> ERROR! </Styles>;
  }

  return (
    <Styles>
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
    </Styles>
  );
};

export default CalendarContainer;
