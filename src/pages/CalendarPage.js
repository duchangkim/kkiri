import React from "react";
import { Row, Col } from "react-bootstrap";
import CalendarContainer from "../containers/calendar/CalendarContainer";

const CalendarPage = () => {
  return (
    <Row className="main-contents m-0 p-0">
      <Col className="h-100 m-0">
        <CalendarContainer />
      </Col>
    </Row>
  );
};

export default React.memo(CalendarPage);
