import React from 'react';
import LeftMainContainer from '../containers/main/LeftMainContainer';
import RightMainContainer from '../containers/main/RightMainContainer';
import { Row, Col } from 'react-bootstrap';
import '../css/MainPage.css';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

const MainPage = ({ history }) => {
  const member = useSelector(({ member }) => member.member);

  if (!member) {
    history.push('/');
    return <h1>No Contents</h1>;
  }
  if (!member.coupleShareCode) {
    history.push('/registercouple');
    return <h1>No Contents</h1>;
  }

  return (
    <Row className="main-contents m-0 p-0" md={2} sm={1}>
      <Col xl={5} md={5} className="h-100 m-0 p-0">
        <LeftMainContainer />
      </Col>
      <Col xl={7} md={7} className="m-0 p-0">
        <RightMainContainer />
      </Col>
    </Row>
  );
};

export default withRouter(MainPage);
