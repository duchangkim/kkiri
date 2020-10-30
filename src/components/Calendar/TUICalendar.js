import React, { useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  moveToNextRange,
  moveToPrevRange,
  moveToToday,
} from "../../modules/calendar";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdAdd,
} from "react-icons/md";

import TUICalendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import styled from "styled-components";

const Styles = styled.div`
  width: 100%;
  height: 100%;

  button {
    display: flex;
    align-items: center;
    outline: none;
    border: none;
    background: #ffffff;
    font-size: 2rem;
    color: #999;
    &:hover {
      color: #ff838da0;
    }
  }
  .btn-today {
    margin: 5px 0;
    border-radius: 10px;
    font-size: 1.4rem;
    color: ${(props) => (props.isToday ? "#ff838d" : "#919191")};
    &:hover {
      background: #ff838da0;
      color: #fff;
    }
  }
  .btn-add {
    color: #ff838d;
  }
  .calendar-nav {
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    height: 5%;
  }
  .current-range {
    width: 200px;
    margin: 0;
    text-align: center;
    font-size: 1.8rem;
    cursor: context-menu;
    color: ${(props) => (props.isToday ? "#ff838d" : "#919191")};
  }
  .schedule-btn-wapper {
    display: flex;
    flex-direction: row-reverse;
    width: 75%;
    height: 100%;
  }
`;

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));
console.log(`start: ${start} end: ${end}`);
const schedules = [
  {
    calendarId: "1",
    category: "time",
    isVisible: true,
    title: "Study",
    id: "1",
    body: "Test",
    start,
    end,
  },
  {
    calendarId: "2",
    category: "time",
    isVisible: true,
    title: "Meeting",
    id: "2",
    body: "Description",
    start: new Date(),
    end: new Date(new Date().setDate(start.getDate() + 1)),
  },
  {
    calendarId: "1",
    category: "allday",
    isVisible: true,
    title: "테스트 일정 3",
    id: "3",
    body: "Description",
    start: new Date(new Date().setDate(start.getDate() + 5)),
    end: new Date(new Date().setDate(start.getDate() + 7)),
  },
];
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
export default () => {
  const cal = useRef(null);

  const onClickSchedule = useCallback((e) => {
    console.dir(`clicked schedule`);
    const { calendarId, id } = e.schedule;
    const el = cal.current.calendarInst.getElement(id, calendarId);
    console.dir(cal.current.calendarInst);

    console.log(e, el.getBoundingClientRect());
  }, []);

  const onBeforeCreateSchedule = useCallback((scheduleData) => {
    console.dir(scheduleData);

    const schedule = {
      id: scheduleData.calendarId,
      title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      start: scheduleData.start,
      end: scheduleData.end,
      category: scheduleData.isAllDay ? "allday" : "time",
      dueDateClass: "",
      location: scheduleData.location,
      raw: {
        class: scheduleData.raw["class"],
      },
      state: scheduleData.state,
    };
    cal.current.calendarInst.createSchedules([schedule]);
  }, []);

  const onBeforeDeleteSchedule = useCallback((res) => {
    console.log(`call Delete  ${res}`);
    const { id, calendarId } = res.schedule;

    cal.current.calendarInst.deleteSchedule(id, calendarId);
  }, []);

  const onBeforeUpdateSchedule = useCallback((e) => {
    console.log(`call Update  ${e}`);
    const { schedule, changes } = e;

    cal.current.calendarInst.updateSchedule(
      schedule.id,
      schedule.calendarId,
      changes
    );
  }, []);

  const _getFormattedTime = (time) => {
    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();

    return `${h}:${m}`;
  };

  const _getTimeTemplate = (schedule, isAllday) => {
    let html = [];

    if (!isAllday) {
      html.push(`<strong>${_getFormattedTime(schedule.start)}</strong>`);
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

  // calendar nav button handler
  const calendarRange = useSelector((state) => state.calendar);
  console.dir(calendarRange);
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
    <Styles isToday={calendarRange.isToday}>
      <div className="calendar-nav">
        <button className="btn-prev" onClick={onMoveToPrevRange}>
          <MdKeyboardArrowLeft />
        </button>
        <h2 className="current-range">
          {calendarRange.year}년 {calendarRange.month}월
        </h2>
        <button className="btn-next" onClick={onMoveToNextRange}>
          <MdKeyboardArrowRight />
        </button>
        <button className="btn-today" onClick={onMoveToToday}>
          Today
        </button>
        <div className="schedule-btn-wapper">
          <button className="btn-add">
            <MdAdd />
          </button>
        </div>
      </div>
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
