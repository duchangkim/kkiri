import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import CalendarSide from "../../components/Calendar/CalendarSide";

const CalenderSideContainer = ({ calendars }) => {
  return <CalendarSide calendars={calendars} />;
};

export default CalenderSideContainer;
