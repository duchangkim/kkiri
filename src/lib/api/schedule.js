import client from "./client";

export const createSchedule = (schedule) => {
  console.log(schedule);
  return client.post("/api/schedules", schedule);
};

export const getScheduleList = () => client.get("/api/schedules");

export const getSchedule = (scheduleId) =>
  client.get(`/api/schedules/${scheduleId}`);

export const modifySchedule = (schedule) => {
  console.log(schedule.id);
  console.log(schedule);
  return client.put(`/api/schedules/${schedule.id}`, schedule);
};

export const deleteSchedule = (scheduleId) =>
  client.delete(`/api/schedules/${scheduleId}`);
