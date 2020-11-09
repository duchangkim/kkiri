import client from './client';

export const createCalendar = (calendar) => {
  console.log('call c calendar');
  return client.post('/api/calendars', calendar);
};

export const getCalendarList = () => client.get('/api/calendars');

export const getCalendar = (calendarId) =>
  client.get(`/api/calendars/${calendarId}`);

export const modifyCalendar = (calendar) =>
  client.put(`/api/calendars/${calendar.id}`, calendar);

export const deleteCalendar = (calendarId) =>
  client.delete(`/api/calendars/${calendarId}`);
