export default (scheduleData) => {
  const schedule = {
    calendarId: parseInt(scheduleData.calendarId, 10),
    title: scheduleData.title,
    isAllDay: scheduleData.isAllDay,
    start: scheduleData.start.toDate(),
    end: scheduleData.end.toDate(),
    category: scheduleData.isAllDay ? "allday" : "time",
    location: scheduleData.location,
    raw: {
      class: scheduleData.raw["class"],
    },
    state: scheduleData.state,
  };

  return schedule;
};
