import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getCouple } from '../../modules/couple';
import { getMyWeather, getYourWeather } from '../../modules/weather';
import LeftMain from '../../components/Main/LeftMain';
import getPosition from '../../lib/getPosition';
import { insertPosition, insertGetTogetherDate } from '../../modules/member';
import { withRouter } from 'react-router-dom';

const LeftMainContainer = () => {
  const dispatch = useDispatch();
  const { couple, coupleError, member, myWeather, yourWeather } = useSelector(
    ({ couple, member, weather }) => ({
      couple: couple.couple,
      coupleError: couple.coupleError,
      member: member.member,
      myWeather: weather.myWeather,
      yourWeather: weather.yourWeather,
    }),
    shallowEqual
  );

  const [dateInputValue, setDateInputValue] = useState('');
  const handleGetTogetherDateChange = (e) => {
    const { value } = e.target;
    setDateInputValue(value);
  };
  const handleGetTogetherDateClick = (e) => {
    e.preventDefault();
    console.dir(dateInputValue);

    dispatch(insertGetTogetherDate(dateInputValue));
  };

  useEffect(() => {
    console.log('ㅅㅂ마이웨더좀 불러와라');
    dispatch(getCouple());
    getPosition(dispatch, getMyWeather);
  }, [dispatch]);

  useEffect(() => {
    if (couple) {
      const API_KEY = '8838396b78d2bd1ab29b19d58374f16c';
      dispatch(
        getYourWeather({
          latitude: couple.position.latitude,
          longitude: couple.position.longitude,
          API_KEY,
        })
      );
    }
  }, [dispatch, couple]);

  useEffect(() => {
    if (myWeather) {
      dispatch(
        insertPosition({
          latitude: myWeather.coord.lat,
          longitude: myWeather.coord.lon,
        })
      );
    }
  }, [dispatch, myWeather]);

  if (!couple) {
    return <h1>Loading...</h1>;
  }
  if (coupleError) {
    return <h1>Error!!</h1>;
  }
  if (!myWeather || !yourWeather) {
    return <h1>Loading...</h1>;
  }

  return (
    <LeftMain
      myWeather={myWeather}
      yourWeather={yourWeather}
      couple={couple}
      member={member}
      onSaveButtonClick={handleGetTogetherDateClick}
      onDateInputChange={handleGetTogetherDateChange}
      dateInputValue={dateInputValue}
    />
  );
};

export default withRouter(LeftMainContainer);
