import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import CalendarFormPopup from '../../components/Calendar/CalendarFormPopup';
import {
  initializeForm,
  changeField,
  createCalendar,
  modifyCalendar,
} from '../../modules/calendar';
import { togglePopup } from '../../modules/tuiCalendar';

const CalendarFormPopupContainer = () => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { isOpen, type } = useSelector(
    ({ tuiCalendar }) => ({
      isOpen: tuiCalendar.calendarDataFormPopup.isOpen,
      type: tuiCalendar.calendarDataFormPopup.type,
    }),
    shallowEqual
  );
  // console.log(isOpen);
  const { form } = useSelector(
    ({ calendar }) => ({
      form: calendar.calendarForm,
    }),
    shallowEqual
  );

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      changeField({
        name,
        value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log('onsubmit');
    const type = e.target.id;
    console.dir(type);
    const { name, color, bgColor, id } = form;
    if ([name, color, bgColor].includes('')) {
      setError('빈칸을 모두 채워주세요!');
      return;
    }
    setError('');

    if (type === 'create') {
      dispatch(
        createCalendar({
          name,
          color,
          bgColor,
        })
      );
      dispatch(togglePopup());
      dispatch(initializeForm());
      return;
    }
    if (type === 'modify') {
      console.log('modi');
      dispatch(
        modifyCalendar({
          name,
          color,
          bgColor,
          id,
        })
      );
      dispatch(togglePopup());
      dispatch(initializeForm());
      return;
    }
  };

  useEffect(() => {
    if (!isOpen) {
      console.log(type);
      setError('');
    }
    // type이 수정일 때는 초기화 하지 않음
    if (type === 'modify') {
      return;
    }
    dispatch(initializeForm());
  }, [dispatch, isOpen, type]);

  return (
    <CalendarFormPopup
      isOpen={isOpen}
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      type={type}
    />
  );
};

export default CalendarFormPopupContainer;
