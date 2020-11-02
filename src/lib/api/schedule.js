import client from "./client";

export const createSchedule = (schedule) =>
  client.post("/api/schedules", schedule);

export const getScheduleList = () => client.get("/api/schedules");

export const getSchedule = (scheduleId) =>
  client.get(`/api/schedules/${scheduleId}`);

export const modifySchedule = (scheduleId, schedule) =>
  client.put(`/api/schedules/${scheduleId}`, schedule);

export const deleteSchedule = (scheduleId) =>
  client.delete(`/api/schedules/${scheduleId}`);
