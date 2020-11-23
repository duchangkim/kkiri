import React, { useState, useEffect, useRef } from 'react';
import Chat from '../../components/Chat/Chat';
import { Row, Col } from 'react-bootstrap';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMessageList, insertMessageList } from '../../modules/chat';
import LoadingPage from '../../pages/LoadingPage';

const ChatContainer = ({ history }) => {
  const dispatch = useDispatch();
  // ref
  const socketRef = useRef();
  const messagesRef = useRef();
  const newMessagesTemp = useRef([]);

  // store state
  const { member } = useSelector(({ member }) => ({ member: member.member }));
  const { messageList, messageListError } = useSelector(({ chat }) => ({
    messageList: chat.messageList,
    messageListError: chat.messageListError,
  }));
  const { loading } = useSelector(({ loading }) => ({ loading }));
  const state = useSelector((state) => ({ state }));
  console.log(state);
  console.log(loading);

  // state
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [messagePageNum, setMessagePageNum] = useState(0);
  const [visitTime, setVisitTime] = useState(new Date());
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [messageListLoad, setMessageListLoad] = useState(false);

  const receivedMessage = async (message) => {
    // console.log('리시브 메시시');
    // console.log(Array.isArray(message));
    // console.log(message);
    if (Array.isArray(message)) {
      setMessages((oldMessages) => {
        // console.log(oldMessages);
        // console.log([...oldMessages, ...message]);

        return [...oldMessages, ...message]
          .filter((item, index) => {
            return (
              [...oldMessages, ...message].findIndex((item2, index2) => {
                return (
                  new Date(item.sendDate).getTime() ===
                  new Date(item2.sendDate).getTime()
                );
              }) === index
            );
          })
          .sort((a, b) => {
            const aDate = new Date(a.sendDate);
            const bDate = new Date(b.sendDate);
            return aDate - bDate;
          });
      });
      // console.log(messages);
      return;
    }
    setMessages((oldMessages) => [...oldMessages, message]);
    try {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message !== '') {
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
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage(e);
    }
  };

  const handleMoreButtonClick = (e) => {
    console.log('더보기 버튼 눌렀다');
    e.preventDefault();
    dispatch(getMessageList(messagePageNum));
    // receivedMessage(messageList);
    setMessagePageNum((prev) => prev + 1);
  };

  const onEmojiClick = (event, emojiObject) => {
    // console.dir(emojiObject.emoji);
    setMessage(message.concat(emojiObject.emoji));
    setChosenEmoji(emojiObject);
  };

  useEffect(() => {
    if (member) {
      console.log('소켓 연결하는 유이펙');
      socketRef.current = io.connect('/');
      socketRef.current.emit('joinRoom', member.coupleShareCode);
      socketRef.current.on('message', (message) => {
        console.log('메시지받음');
        receivedMessage(message);
      });
      setVisitTime(new Date());
    }
  }, []);

  useEffect(() => {
    return () => {
      console.log('페이지에서 나가셨구먼유');
      console.log(messages);
      const newMessages = newMessagesTemp.current.filter(
        (message) => new Date(message.sendDate) >= visitTime
      );
      console.log(newMessages);

      dispatch(insertMessageList(newMessages));
      setMessages([]);
      newMessagesTemp.current = [];
      setMessageListLoad(false);
    };
  }, []);

  useEffect(() => {
    console.log('리스너 유이펙');
    window.addEventListener('beforeunload', () => {
      socketRef.current.emit('leaveRoom', member.coupleShareCode);
      socketRef.current.disconnect();

      const newMessages = newMessagesTemp.current.filter(
        (message) => new Date(message.sendDate) >= visitTime
      );

      dispatch(insertMessageList(newMessages));
      setMessages([]);
      newMessagesTemp.current = [];
      setMessageListLoad(false);
    });

    return () => {
      window.removeEventListener('beforeunload', () => {});
    };
  }, []);

  useEffect(() => {
    if (messageList.length === 0 && messagePageNum !== 1) {
      console.log('불러올것이 더이상 없다.');
      setMessageListLoad(true);
      return;
    }
    receivedMessage(messageList);
  }, [messageList]);

  useEffect(() => {
    if (!loading['chat/GET_MESSAGE_LIST'] && messagePageNum !== 1) {
      console.log('메시지 로딩 끝?');
      if (!messagesRef) {
        return;
      }
      setTimeout(() => {
        messagesRef.current.scrollTo(0, 0);
      }, 30);
    }
  }, [messageList, loading]);

  useEffect(() => {
    newMessagesTemp.current = messages;
  }, [messages]);

  useEffect(() => {
    if (messagesRef !== null) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  if (messagePageNum === 0) {
    console.log('최초로딩 시 디스퍁치 - 이전 채팅 가져오기');
    dispatch(getMessageList(messagePageNum));
    setMessagePageNum((prev) => prev + 1);
  }

  // console.log(messagePageNum);
  // console.log(messages);

  if (!member) {
    history.push('/');
    return <LoadingPage />;
  }
  if (messageListError) {
    return <LoadingPage />;
  }
  if (!messages) {
    return <LoadingPage />;
  }

  return (
    <Row className="main-contents m-0 p-0">
      <Col className="m-0 p-0">
        <Chat
          messagesRef={messagesRef}
          member={member}
          message={message}
          messages={messages}
          handleChange={handleChange}
          sendMessage={sendMessage}
          handleKeyPress={handleKeyPress}
          onMoreButtonClick={handleMoreButtonClick}
          chosenEmoji={chosenEmoji}
          onEmojiClick={onEmojiClick}
          messageListLoad={messageListLoad}
        />
      </Col>
    </Row>
  );
};

export default withRouter(ChatContainer);
