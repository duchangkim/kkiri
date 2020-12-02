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
  const [displayTextColorPicker, setDisplayTextColorPicker] = useState(false);
  const [displayBgColorPicker, setDisplayBgColorPicker] = useState(false);
  const [color, setColor] = useState({
    text: '#ffffff',
    bg: '#ffffff',
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { isOpen, type } = useSelector(
    ({ tuiCalendar }) => ({
      isOpen: tuiCalendar.calendarDataFormPopup.isOpen,
      type: tuiCalendar.calendarDataFormPopup.type,
    }),
    shallowEqual
  );
  const { form } = useSelector(
    ({ calendar }) => ({
      form: calendar.calendarForm,
    }),
    shallowEqual
  );

  const handleTextColorClick = () => {
    setDisplayBgColorPicker(false);
    setDisplayTextColorPicker((prev) => !prev);
  };

  const handleBgColorClick = () => {
    setDisplayTextColorPicker(false);
    setDisplayBgColorPicker((prev) => !prev);
  };

  const handleTextColorChangeComplete = (color) => {
    setColor((state) => ({
      ...state,
      text: color,
    }));
  };

  const handleBgColorChangeComplete = (color) => {
    setColor((state) => ({
      ...state,
      bg: color,
    }));
  };

  const handleTextColorChange = (color, event) => {
    dispatch(
      changeField({
        name: 'color',
        value: color.hex,
      })
    );
  };

  const handleBgColorChange = (color, event) => {
    dispatch(
      changeField({
        name: 'bgColor',
        value: color.hex,
      })
    );
  };

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
    const type = e.target.id;
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
      onTextColorClick={handleTextColorClick}
      displayTextColorPicker={displayTextColorPicker}
      textColor={color.text}
      onTextColorChange={handleTextColorChange}
      onTextColorChangeComplete={handleTextColorChangeComplete}
      onBgColorClick={handleBgColorClick}
      displayBgColorPicker={displayBgColorPicker}
      bgColor={color.bg}
      onBgColorChange={handleBgColorChange}
      onBgColorChangeComplete={handleBgColorChangeComplete}
    />
  );
};

export default CalendarFormPopupContainer;
