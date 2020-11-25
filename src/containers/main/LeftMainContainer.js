import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getCouple } from '../../modules/couple';
import { getMyWeather, getYourWeather } from '../../modules/weather';
import LeftMain from '../../components/Main/LeftMain';
import getPosition from '../../lib/getPosition';
import { insertPosition, insertGetTogetherDate } from '../../modules/member';
import { withRouter } from 'react-router-dom';
import LoadingPage from '../../pages/LoadingPage';

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
  const state = useSelector((state) => state);
  console.log(state);
  console.log(member + 'member를 부른다');
  console.dir(member);

  const [dateInputValue, setDateInputValue] = useState('');
  const handleGetTogetherDateChange = (e) => {
    const { value } = e.target;
    setDateInputValue(value);
  };
  const handleGetTogetherDateClick = (e) => {
    e.preventDefault();
    // console.dir(dateInputValue);

    dispatch(insertGetTogetherDate(dateInputValue));
  };

  useEffect(() => {
    if (!myWeather) {

      // console.log('ㅅㅂ마이웨더좀 불러와라');
      // console.log(`이거슨 커플님 아이디 : ${member.coupleId}`);
      if(member.coupleId) {
        dispatch(getCouple(member.coupleId));
        getPosition(dispatch, getMyWeather);
      }
    }
  }, [dispatch, member, myWeather]);

  useEffect(() => {
    if (!yourWeather) {
      // console.log('느그 날씨좀 불러와랏 ㅂ');
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
    }
  }, [dispatch, couple, member, yourWeather]);

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
    console.log('커플없음');
    return <LoadingPage />;
  }
  if (coupleError) {
    return <h1>Error!!</h1>;
  }
  if (!myWeather || !yourWeather) {
    console.log('날씨없음');
    return <LoadingPage />;
  }

  console.log(myWeather);
  return (
    <>
      <LeftMain
        myWeather={myWeather}
        yourWeather={yourWeather}
        couple={couple}
        member={member}
        onSaveButtonClick={handleGetTogetherDateClick}
        onDateInputChange={handleGetTogetherDateChange}
        dateInputValue={dateInputValue}
      />
    </>
  );
};

export default withRouter(LeftMainContainer);
