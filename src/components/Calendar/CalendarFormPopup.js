import React from 'react';
import styled from 'styled-components';
import { Alert, Form } from 'react-bootstrap';
import { BlockPicker } from 'react-color';

const CalendarFormPopupBlock = styled.div`
  border: 1px solid #eaeaea;
  box-shadow: 0 0 7px #ddd;

  position: fixed;
  right: 15%;
  top: 15%;

  width: 250px;
  padding: 20px;
  z-index: 99999;

  background: #fff;

  h5 {
    text-align: center;
    margin-bottom: 20px;
  }
  .alert-danger {
    text-align: center !important;
    font-size: 0.8rem !important;
  }
  form {
    display: flex;
    flex-direction: column;
  }

  .block-picker {
    margin: 0 auto !important;
  }

  @media ${(props) => props.theme.mobile} {
    right: 20%;
    top: 5%;
  }
`;
const Button = styled.button`
  background: #ff838d;
  border: none;

  &:hover,
  &:focus {
    border: none;
    background: #faa3aa;
  }
`;
const colors = [
  '#F15A5A',
  '#F0C419',
  '#4EBA6F',
  '#2D95BF',
  '#955BA5',
  '#F28A2E',
  '#282828',
  '#5A5A5A',
  '#FFFFFF',
];

const CalendarFormPopup = ({
  isOpen,
  form,
  onSubmit,
  onChange,
  error,
  type,
  onTextColorClick,
  displayTextColorPicker,
  textColor,
  onTextColorChange,
  onTextColorChangeComplete,
  onBgColorClick,
  displayBgColorPicker,
  bgColor,
  onBgColorChange,
  onBgColorChangeComplete,
}) => {
  const textMap = {
    create: '추가',
    modify: '수정',
  };
  // const isOpen = true;
  // console.log(form);
  return (
    <>
      {isOpen ? (
        <CalendarFormPopupBlock>
          <h5>캘린더 필터 {textMap[type]}</h5>
          <Form onSubmit={onSubmit} id={type}>
            <Form.Group controlId="formBasicFilter">
              <Form.Control
                type="text"
                placeholder="필터 이름"
                autoComplete="off"
                name="name"
                value={form.name}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicFilterColor">
              <Form.Control
                type="text"
                placeholder="텍스트 색상"
                autoComplete="off"
                maxLength={7}
                name="color"
                value={form.color}
                onChange={onChange}
                onClick={onTextColorClick}
                readOnly
              />
              {displayTextColorPicker ? (
                <BlockPicker
                  onChange={onTextColorChange}
                  onChangeComplete={onTextColorChangeComplete}
                  color={textColor}
                  colors={colors}
                />
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicFilterBgColor">
              <Form.Control
                type="text"
                placeholder="필터 색상"
                autoComplete="off"
                maxLength={7}
                name="bgColor"
                value={form.bgColor}
                onChange={onChange}
                onClick={onBgColorClick}
                readOnly
              />
              {displayBgColorPicker ? (
                <BlockPicker
                  onChange={onBgColorChange}
                  color={bgColor}
                  onChangeComplete={onBgColorChangeComplete}
                  colors={colors}
                />
              ) : null}
            </Form.Group>
            {error ? <Alert variant="danger">{error}</Alert> : null}
            {type === 'create' ? (
              <Button className="btn btn-primary" onClick={null}>
                {textMap[type]}
              </Button>
            ) : (
              <Button className="btn btn-primary" onClick={null}>
                {textMap[type]}
              </Button>
            )}
          </Form>
        </CalendarFormPopupBlock>
      ) : null}
    </>
  );
};

export default CalendarFormPopup;
