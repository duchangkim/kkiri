import { Row, Col } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import { useSelector, useDispatch } from 'react-redux';
import { getMessageList, insertMessageList } from '../../modules/chat';
import LoadingPage from '../LoadingPage';

const ChattingBox = styled.div`
  width: 100%;
  height: 100%;
  /* 채팅 */
  .chatting-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 88vh;
    padding: 0px 2%;
  }
  .chattingDate {
    padding-top: 10px;
    text-align: center;
    color: #6b6b6b;
  }
  .profile {
    width: 45px;
    height: 45px;
    border: 4px solid #ffffff;
    border-radius: 50%;
    background-color: thistle;
    position: relative;
    top: -35px;
    left: 10.3%;
  }
  .profile .name {
    position: relative;
    top: 6px;
    left: -152px;
    text-align: end;
    width: 150px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .profile2 {
    width: 45px;
    height: 45px;
    border: 4px solid #ffffff;
    border-radius: 50%;
    background-color: thistle;
    position: relative;
    top: -35px;
    left: -10.3%;
  }
  .profile2 .name {
    position: relative;
    top: 6px;
    left: 40px;
    width: 150px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .Time {
    position: absolute;
    bottom: 1px;
    font-size: 12px;
    left: 85.5%;
  }
  .Time2 {
    position: absolute;
    bottom: 1px;
    font-size: 12px;
    left: 11%;
  }
  .chatting-send {
    width: 100%;
    height: 80px;
  }
  .chatting-send form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
  .chatting-send form input {
    box-sizing: border-box;
    width: 88%;
    height: 50px;
    /* border: 2px solid #ff838d; */
    padding-left: 20px;
    font-size: 1.2rem;
    outline: none;
  }
  .chatting-send form button {
    box-sizing: border-box;
    outline: none;
  }
  .btn-plus {
    width: 40px;
    height: 40px;
    background: none;
    border: 2px solid #ff838d;
    border-radius: 50%;
    color: #ff838d;
  }
  .btn-send {
    width: 8%;
    height: 50px;
    border: none;
    border-radius: 10px;
    background: #ff838d;
    color: #ffffff;
    font-size: 1.4rem;
  }
  .emoji-picker-react {
    width: 100%;
    height: 160px;
  }
  .emoji-search {
    display: none;
  }

  @media (max-width: 768px) {
    .chatting-send form input {
      box-sizing: border-box;
      width: 80%;
      height: 50px;
      padding-left: 20px;
      font-size: 1.2rem;
      outline: none;
    }
    .btn-send {
      width: 10%;
      height: 50px;
      border: none;
      border-radius: 10px;
      background: #ff838d;
      color: #ffffff;
      font-size: 1.4rem;
    }
    .PartnerMessage {
      width: 45%;
    }
    .MyMessage {
      width: 45%;
    }
    .profile {
      position: relative;
      top: -35px;
      left: 45.5%;
    }
    .profile2 {
      position: relative;
      top: -35px;
      left: -45.5%;
    }
    .Time {
      position: absolute;
      bottom: 1px;
      font-size: 12px;
      left: 40%;
    }
    .Time2 {
      position: absolute;
      bottom: 1px;
      font-size: 12px;
      left: 47%;
    }
    .btn-send {
      font-size: 1.1rem;
    }
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  border-top: 3px solid #efefef;
  border-bottom: 3px solid #efefef;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #dfdfdf;
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;
const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 25px;
  position: relative;
`;
const MyMessage = styled.div`
  width: 10%;
  background-color: pink;
  color: #46516e;
  padding: 10px;
  margin-right: 5px;
  text-align: center;
  word-break: keep-all;
  word-break: break-all;
`;
const PartnerRow = styled(MyRow)`
  justify-content: flex-start;
`;
const PartnerMessage = styled.div`
  width: 10%;
  border: 1px solid lightgray;
  background-color: pink;
  color: #46516e;
  padding: 10px;
  margin-left: 5px;
  text-align: center;
  word-break: keep-all;
  word-break: break-all;
`;

const Chatting = ({ history }) => {
  const dispatch = useDispatch();
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [chosenEmoji, setChosenEmoji] = useState(null);

  // console.log(messages);

  const state = useSelector((state) => ({ state }));
  console.log(state);

  const { member } = useSelector(({ member }) => ({
    member: member.member,
  }));
  const { messageList, messageListError } = useSelector(({ chat }) => ({
    messageList: chat.messageList,
    messageListError: chat.messageListError,
  }));

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('/');
    console.log('연결확인');
    socketRef.current.emit('joinRoom', member.coupleShareCode);
    socketRef.current.on('your id', (id) => {
      setYourID(id);
    });

    socketRef.current.on('message', (message) => {
      console.log('메세지보냄');
      console.log(message);
      receivedMessage(message);
    });
  }, []);

  const messagesRef = useRef();
  // // 메세지 스크롤 하단 고정
  useEffect(() => {
    if (messagesRef !== null) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    dispatch(getMessageList(0));
    console.log(messageList);
    const now = Date.now();

    return () => {
      console.log('페이지 나가요~');
      socketRef.current.emit('leaveRoom', member.coupleShareCode);
      socketRef.current.disconnect();
      const messageListFromLocalStorage = JSON.parse(
        localStorage.getItem('messages')
      );

      const newMessages = messageListFromLocalStorage.filter(
        (message) => new Date(message.sendDate) >= now
      );
      console.log(newMessages);

      dispatch(insertMessageList(newMessages)); //배열을 보냄
    };
  }, [dispatch]);

  useEffect(() => {
    console.log('렌더링 될때 한번이지?');
    dispatch(getMessageList(0));
    try {
      // 로컬스토리지에서 메시지 리스트 가져오는데 없으면 만들기
      const messageListFromLocalStorage = JSON.parse(
        localStorage.getItem('messages')
      );
      if (!messageListFromLocalStorage) {
        console.log('로컬스토리지 없어서 만든다.');
        localStorage.setItem('messages', JSON.stringify(messageList));
      }
      setMessages(messageListFromLocalStorage);
    } catch (e) {
      localStorage.setItem('messages', JSON.stringify(messageList));
      console.log('로컬스토리지 에에러러');
    }
  }, []);

  useEffect(() => {
    // console.log('여기한번 와볼래?');
    const messageListFromLocalStorage = JSON.parse(
      localStorage.getItem('messages')
    );
    if (
      !messageListFromLocalStorage ||
      messageListFromLocalStorage.length === 0
    ) {
      console.log(
        '여기는 로컬스토리지에 메시지도 없고 있어도 빈 배열일 때 들어오ㅓㄴ단다.'
      );
      setMessages(messageList);
      localStorage.setItem('messages', JSON.stringify(messageList));
    }
  }, [messageList]);

  function receivedMessage(message) {
    try {
      const messageListFromLocalStorage = JSON.parse(
        localStorage.getItem('messages')
      );
      messageListFromLocalStorage.push(message);
      setMessages(messageListFromLocalStorage);
      localStorage.setItem(
        'messages',
        JSON.stringify(messageListFromLocalStorage)
      );
    } catch (e) {
      console.log('로컬스토리지 에에러러');
    }
  }

  // 메시지 보내는 함수
  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      coupleShareCode: member.coupleShareCode,
      sender: member._id,
      name: member.name,
      text: message,
      sendDate: new Date(),
    };
    setMessage('');
    socketRef.current.emit('send message', messageObject);
    console.log('메시지 보냄');
    console.log(messageObject);
  }

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage(e);
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    console.log(chosenEmoji + '이모지');
  };

  const addEmoji = (e) => {
    let emoji = e.native;
    this.setState({
      message: this.state.message + emoji,
    });
  };

  const getToday = () => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm =
      now.getMonth() < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
    const dd = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();

    return `${yyyy}년 ${mm}월 ${dd}일`;
  };

  const dateFormat = (sendDate) => {
    // console.log(sendDate);
    const hh = new Date(sendDate).getHours();
    const mm =
      new Date(sendDate).getMinutes() < 10
        ? `0${new Date(sendDate).getMinutes()}`
        : new Date(sendDate).getMinutes();
    return `${hh}시 : ${mm}분`;
  };

  if (messageListError) {
    return <LoadingPage />;
  }

  if (!messages) {
    return (
      <>
        <LoadingPage />
        <h1 ref={messagesRef}>Loading</h1>
      </>
    );
  }

  if (!member) {
    history.push('/');
    return <LoadingPage />;
  }
  // console.log(messageList);
  return (
    <Row className="main-contents m-0 p-0">
      <Col className="m-0 p-0">
        <ChattingBox>
          <div className="chatting-wrapper">
            <Container ref={messagesRef} messages={messages}>
              <p className="chattingDate">{getToday()}</p>
              {messages.map((message, index) => {
                if (message.sender === member._id) {
                  return (
                    <MyRow className="MyRow" key={index}>
                      <div className="profile">
                        <div className="name">{message.name}</div>
                      </div>
                      <MyMessage className="MyMessage">
                        {message.text}
                      </MyMessage>
                      <div className="Time">{dateFormat(message.sendDate)}</div>
                    </MyRow>
                  );
                }
                return (
                  <PartnerRow className="PartnerRow" key={index}>
                    <PartnerMessage className="PartnerMessage">
                      {message.text}
                    </PartnerMessage>
                    <div className="Time2">{dateFormat(message.sendDate)}</div>
                    <div className="profile2">
                      <div className="name">{message.name}</div>
                    </div>
                  </PartnerRow>
                );
              })}
            </Container>
            <div>
              {chosenEmoji ? (
                <span>You chose: {chosenEmoji.emoji}</span>
              ) : (
                <span>No emoji Chosen</span>
              )}
              <Picker
                onEmojiClick={onEmojiClick}
                onSelect={addEmoji}
                preload={true}
                skinTone={SKIN_TONE_MEDIUM_DARK}
              />
            </div>
            {member && (
              <div className="chatting-send">
                <form onSubmit={sendMessage}>
                  <button className="btn-plus">+</button>
                  <input
                    type="text"
                    value={message}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                  />
                  <button className="btn-send">send</button>
                </form>
              </div>
            )}
          </div>
        </ChattingBox>
      </Col>
    </Row>
  );
};

export default Chatting;
