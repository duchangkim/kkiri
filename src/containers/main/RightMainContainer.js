import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RightMain from '../../components/Main/RightMain';
import { getScheduleList } from '../../modules/schedule';

const LeftMainContainer = () => {
  const dispatch = useDispatch();
  const { scheduleList } = useSelector(({ schedule }) => ({
    scheduleList: schedule.schedules,
  }));

  useEffect(() => {
    dispatch(getScheduleList());
  }, [dispatch]);

  if (!scheduleList) {
    return <h1>Loading...</h1>;
  }

  const schedules = scheduleList
    .filter(
      (schedule) =>
        schedule.id !== 'l' &&
        schedule.id !== 0 &&
        schedule.calendarId !== 'dday'
    )
    .slice(0, 5);

  const dDays = scheduleList
    .filter((schedule) => schedule.calendarId === 'dday')
    .slice(0, 5);

  return <RightMain schedules={schedules} dDays={dDays} />;
};

export default LeftMainContainer;
