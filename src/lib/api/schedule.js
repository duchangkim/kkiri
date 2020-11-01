import client from "./client";

export const createSchedule = ({
  category,
  isVisible,
  title,
  calendarId,
  body,
  location,
  start,
  end,
}) => client.post("/api/schedule");

export const getScheduleList = () => client.get("/api/schedule");

export const getSchedule = (scheduleId) =>
  client.get(`/api/schedule/${scheduleId}`);

export const modifySchedule = (
  scheduleId,
  { category, isVisible, title, calendarId, body, location, start, end }
) => client.put(`/api/schedule/${scheduleId}`);

export const deleteSchedule = (scheduleId) =>
  client.delete(`/api/schedule/${scheduleId}`);
