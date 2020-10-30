import React from "react";
import { Row, Col } from "react-bootstrap";
import TUICalendar from "./TUICalendar";

const Calendar = () => {
  return (
    <Row className="main-contents m-0 p-0">
      <Col className="h-100 m-0">
        <TUICalendar />
      </Col>
    </Row>
  );
};

export default React.memo(Calendar);
