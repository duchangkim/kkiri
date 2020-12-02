import React, { useState, useEffect, useRef } from 'react';
import Chat from '../../components/Chat/Chat';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMessageList, newMessageOff } from '../../modules/chat';
import LoadingPage from '../../pages/LoadingPage';
import { connectionSocket } from '../../modules/socket';
import { setMessages, initialize } from '../../modules/message';

const ChatContainer = ({ history }) => {
  const dispatch = useDispatch();

  // ref
  const messagesRef = useRef();
  const newMessagesTemp = useRef([]);

  // store state
  const { member } = useSelector(({ member }) => ({ member: member.member }));
  const { messageList, messageListError } = useSelector(({ chat }) => ({
    messageList: chat.messageList,
    messageListError: chat.messageListError,
  }));
  const { loading } = useSelector(({ loading }) => ({ loading }));
  const { messages } = useSelector(({ message }) => ({
    messages: message.messages,
  }));
  const { socket } = useSelector(({ socket }) => ({ socket: socket.socket }));

  // state
  const [message, setMessage] = useState('');
  const [messagePageNum, setMessagePageNum] = useState(0);
  const [visitTime, setVisitTime] = useState(new Date());
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [messageListLoad, setMessageListLoad] = useState(false);
  const [inPage, setInPage] = useState(true);

  const receivedMessage = async (message) => {
    dispatch(setMessages(message));
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
        sendDate: new Date(Date.now()),
      };
      setMessage('');
      socket.emit('send message', messageObject);
      socket.emit('new message', member.coupleId);
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
    e.preventDefault();
    dispatch(getMessageList(messagePageNum));
    setMessagePageNum((prev) => prev + 1);
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message.concat(emojiObject.emoji));
    setChosenEmoji(emojiObject);
  };

  useEffect(() => {
    if (inPage) {
      setTimeout(() => {
        dispatch(newMessageOff());
      }, 200);
    }

    return () => {
      setInPage(false);
      dispatch(newMessageOff());
    };
  }, [messages]);

  useEffect(() => {
    if (member && socket) {
      dispatch(newMessageOff());
      dispatch(connectionSocket(member.coupleShareCode));
      socket.on('message', (message) => {
        receivedMessage(message);
      });
      setVisitTime(new Date());
    }
    return () => {
      if (socket) {
        socket.close();
        socket.disconnect();
        return;
      }

      dispatch(initialize());
      newMessagesTemp.current = [];
      setMessageListLoad(false);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      socket.close();
      socket.disconnect();

      dispatch(initialize());
      newMessagesTemp.current = [];
      setMessageListLoad(false);
    });

    return () => {
      window.removeEventListener('beforeunload', () => {});
    };
  }, [dispatch, socket, visitTime]);

  useEffect(() => {
    if (messageList.length === 0 && messagePageNum !== 1) {
      setMessageListLoad(true);
      return;
    }
    receivedMessage(messageList);
  }, [messageList]);

  useEffect(() => {
    if (!loading['chat/GET_MESSAGE_LIST'] && messagePageNum !== 1) {
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
    dispatch(getMessageList(messagePageNum));
    setMessagePageNum((prev) => prev + 1);
  }

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
