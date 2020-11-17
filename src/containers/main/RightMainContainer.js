import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import RightMain from "../../components/Main/RightMain";
import { getScheduleList } from "../../modules/schedule";
import { listAlbums } from "../../modules/albums";
import LoadingPage from "../../pages/LoadingPage";

const LeftMainContainer = () => {
  const dispatch = useDispatch();
  const { scheduleList, albums } = useSelector(({ schedule, albums }) => ({
    scheduleList: schedule.schedules,
    albums: albums.albums,
  }));

  useEffect(() => {
    dispatch(getScheduleList());
  }, [dispatch]);

  useEffect(() => {
    console.log("앨범드러완ㅇㄴ");
    dispatch(listAlbums());
  }, [dispatch]);

  if (!scheduleList || !albums) {
    return <LoadingPage />;
  }

  console.log(scheduleList);

  const schedules = scheduleList
    .filter(
      (schedule) => schedule.id !== "l" && schedule.id !== 0 && schedule.calendarId !== "dday"
    )
    .slice(0, 5);

  const dDays = scheduleList.filter((schedule) => schedule.calendarId === "dday").slice(0, 5);
  console.dir(albums);
  // console.log(albums.fileData.files);

  return <RightMain schedules={schedules} dDays={dDays} albums={albums} />;
};

export default LeftMainContainer;
