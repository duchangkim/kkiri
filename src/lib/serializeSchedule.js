export default (scheduleData) => {
  const schedule = {
    calendarId: scheduleData.calendarId,
    title: scheduleData.title,
    isAllDay: scheduleData.isAllDay,
    start: scheduleData.start.toDate(),
    end: scheduleData.end.toDate(),
    category: scheduleData.isAllDay ? 'allday' : 'time',
    location: scheduleData.location,
    raw: {
      class: scheduleData.raw['class'],
    },
    state: scheduleData.state,
  };

  return schedule;
};

// const schedule = {
//   id: String(Math.random()),
//   title: scheduleData.title,
//   isAllDay: scheduleData.isAllDay,
//   start: scheduleData.start,
//   end: scheduleData.end,
//   category: scheduleData.isAllDay ? "allday" : "time",
//   dueDateClass: "",
//   location: scheduleData.location,
//   raw: {
//     class: scheduleData.raw["class"]
//   },
//   state: scheduleData.state
// };
