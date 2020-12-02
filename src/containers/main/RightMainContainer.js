import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RightMain from '../../components/Main/RightMain';
import { getScheduleList } from '../../modules/schedule';
import { listAlbums } from '../../modules/albums';
import LoadingPage from '../../pages/LoadingPage';

const LeftMainContainer = () => {
  const dispatch = useDispatch();
  const { scheduleList, albums, member } = useSelector(
    ({ schedule, albums, member }) => ({
      scheduleList: schedule.schedules,
      albums: albums.albums,
      member: member.member,
    })
  );

  useEffect(() => {
    dispatch(getScheduleList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listAlbums());
  }, [dispatch]);

  if (!scheduleList || !albums) {
    return <LoadingPage />;
  }
  const coupleShareCode = member.coupleShareCode;

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

  return (
    <RightMain
      schedules={schedules}
      dDays={dDays}
      albums={albums}
      coupleShareCode={coupleShareCode}
    />
  );
};

export default LeftMainContainer;
