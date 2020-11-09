export default (scheduleData) => {
  if (scheduleData.calendarId === 'dday') {
    return {
      calendarId: scheduleData.calendarId,
      title: scheduleData.title,
      isAllDay: true,
      start: new Date(
        scheduleData.start.toDate().toString().substring(0, 15) + ' 00:00:00'
      ),
      end: scheduleData.end.toDate(),
      category: 'allday',
      location: scheduleData.location,
      raw: {
        class: scheduleData.raw['class'],
      },
      state: scheduleData.state,
    };
  }

  return {
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
};

// console.log(
//   new Date(
//     scheduleData.start.toDate().toString().substring(0, 15) + ' 00:00:00'
//   )
// );
