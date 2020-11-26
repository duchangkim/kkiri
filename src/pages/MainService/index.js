import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { useWindowMatches } from '../../customHooks/hooks';
import NavigationBarContainer from '../../containers/common/NavigationBarContainer';
import Header from '../../components/Header';
import { Route } from 'react-router';
import MainPage from '../MainPage';
import AlbumContainer from '../../containers/album/AlbumContainer';
import UnNavigationBar from '../../components/UnNavigationBar';
import CalendarPage from '../CalendarPage';
import ReadAlbumContainer from '../../containers/album/ReadAlbumContainer';
import ChatContainer from '../../containers/chat/ChatContainer';
import LikeReadAlbumContainer from '../../containers/album/LikeReadAlbumContainer';
import SettingPage from './SettingPage';

import { newMessage } from '../../modules/chat';
import { connectionSocket } from '../../modules/socket';

const CustomContainer = styled.div`
  width: 100%;
  height: 100%;
  .col-sidebar {
    min-width: 120px;
    ${(props) => (props.windowMatches ? '' : 'display: none;')}
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
  const dispatch = useDispatch();
  const socketRef = useRef();
  const windowMatches = useWindowMatches();

  const state = useSelector((state) => ({ state }));
  console.log(state);
  const { member } = useSelector(({ member }) => ({ member: member.member }));
  const { socket } = useSelector(({ socket }) => ({ socket: socket.socket }));

  useEffect(() => {
    if (member) {
      if (!socket) {
        console.log('소켓 없어서 연결하게씀둥');
        dispatch(connectionSocket(member.coupleShareCode));
        return;
      }
      console.log('소켓 연결하는 유이펙');
    }

    socket.on('notification', (coupleId) => {
      if (coupleId === member._id) {
        console.log('메시지 왔는디요?');
        dispatch(newMessage());
      }
    });
  }, [member, dispatch, socket]);

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
            <Route path="/kkiri/home" component={MainPage} exact />
            <Route path="/kkiri/calendar" component={CalendarPage} exact />
            <Route
              path="/kkiri/albums/"
              exact={true}
              component={AlbumContainer}
            />
            <Route
              path={['/kkiri/albums/:idx', '/']}
              exact={true}
              component={ReadAlbumContainer}
            />
            <Route
              path={['/kkiri/albums/like/:idx', '/']}
              exact={true}
              component={LikeReadAlbumContainer}
            />
            <Route
              path="/kkiri/chatting"
              render={() => <ChatContainer socket={socketRef.current} />}
              exact
            />
            <Route
              path="/kkiri/setting/"
              exact={true}
              component={SettingPage}
            />
            {!windowMatches ? (
              <Row className="un_sidebar m-0 p-0">
                <Col className="m-0 p-0" style={{ backgroundColor: 'red' }}>
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

export default React.memo(MainService);
