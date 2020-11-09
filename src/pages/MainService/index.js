import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { useWindowMatches } from "../../customHooks/hooks";
import NavigationBarContainer from "../../containers/common/NavigationBarContainer";
import Header from "../../components/Header";
import { Route } from "react-router";
import Main from "./Main";
import Album from "../../components/Album/Album";
import CalendarPage from "../CalendarPage";

const CustomContainer = styled.div`
  width: 100%;
  height: 100%;
  .col-sidebar {
    min-width: 120px;
    ${(props) => (props.windowMatches ? "" : "display: none;")}
  }
  .header {
    width: 100%;
    height: 10%;
  }
  .main-contents {
    height: 90%;
  }
`;

const MainService = () => {
  const windowMatches = useWindowMatches();
  return (
    <CustomContainer windowMatches={windowMatches}>
      <Container fluid className="w-100 h-100 m-0 p-0">
        <Row className="h-100 m-0 p-0">
          {/*height: 100vh*/}
          <Col xl={1} md={1} className="h-100 m-0 p-0 col-sidebar">
            <NavigationBarContainer windowMatches={windowMatches} />
          </Col>
          <Col className="h-100 m-0 p-0">
            <Row xs={2} className="header m-0 p-0">
              <Header />
            </Row>
            <Route path="/kkiri/home" component={Main} />
            <Route path="/kkiri/calendar" component={CalendarPage} />
            <Route path="/kkiri/album" component={Album} />>
          </Col>
        </Row>
      </Container>
    </CustomContainer>
  );
};

export default MainService;
