import client from "./client";

export const createCalendar = (calendar) => {
  console.log("call c calendar");
  const apicall = client.post("/api/calendars", calendar);
  return apicall;
};

export const getCalendarList = () => client.get("/api/calendars");

export const getCalendar = (calendarId) =>
  client.get(`/api/calendars/${calendarId}`);

export const modifyCalendar = (calendar) =>
  client.put(`api/calendars/${calendar.id}`, calendar);

export const deleteCalendar = (calendarId) =>
  client.delete(`/api/calendars/${calendarId}`);
