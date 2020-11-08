import React from "react";
import styled from "styled-components";
import { Form } from "react-bootstrap";

const CalendarFormPopupBlock = styled.div`
  border: 1px solid #aaa;

  position: fixed;
  right: 200px;
  top: 30px;

  width: 250px;
  padding: 20px;
  z-index: 99999;

  background: #fff;

  h3 {
    text-align: center;
  }
`;

const Button = styled.button`
  background: #ff838d;
  border: none;
`;

const onClick = (e) => {
  e.preventDefault();
};

const CalendarFormPopup = () => {
  return (
    <CalendarFormPopupBlock>
      <h4>캘린더 필터 추가</h4>
      <Form>
        <Form.Group controlId="formBasicFilter">
          <Form.Control type="text" placeholder="필터 이름" />
        </Form.Group>
        <Form.Group controlId="formBasicFilterColor">
          <Form.Control type="text" placeholder="텍스트 색상" />
        </Form.Group>
        <Form.Group controlId="formBasicFilterBgColor">
          <Form.Control type="text" placeholder="필터 색상" />
        </Form.Group>
        <Button className="btn btn-primary" onClick={onClick}>
          저장
        </Button>
      </Form>
    </CalendarFormPopupBlock>
  );
};

export default CalendarFormPopup;
