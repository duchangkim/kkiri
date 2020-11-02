import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { useWindowMatches } from "../../customHooks/hooks";
import NavigationBarContainer from "../../containers/common/NavigationBarContainer";
import Header from "../../components/Header";
import { Route } from "react-router";
import Main from "./Main";
import Album from "../../components/Album/Album";
import Chatting from "./chatting";
import UnNavigationBar from "../../components/UnNavigationBar";
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

  // 10-22 반응형 메인 추가
  @media (max-width: 768px) {
    .header {
      height: 10%;
      /* display: none; */
    }
    .main-contents {
      height: 90%;
    }
    .un_sidebar {
      height: 10%;
      position: fixed;
      bottom: 0;
    }
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
            {windowMatches ? (
              <Row xs={2} sm={1} className="header m-0 p-0">
                <Header />
              </Row>
            ) : null}
            <Route path="/kkiri/home" component={Main} />
            <Route path="/kkiri/calendar" component={CalendarPage} />
            <Route path="/kkiri/album" component={Album} />
            <Route path="/kkiri/chatting" component={Chatting} />
            {!windowMatches ? (
              <Row className="un_sidebar m-0 p-0">
                <Col className="m-0 p-0" style={{ backgroundColor: "red" }}>
                  <UnNavigationBar />
                </Col>
              </Row>
            ) : null}
          </Col>
        </Row>
      </Container>
    </CustomContainer>
  );
};

export default MainService;
