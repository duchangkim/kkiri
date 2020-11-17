import React, { useState, useEffect, useRef } from 'react';
import Chat from '../../components/Chat/Chat';
import { Row, Col } from 'react-bootstrap';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { getMessageList, insertMessageList } from '../../modules/chat';
import LoadingPage from '../../pages/LoadingPage';

const ChatContainer = ({ history }) => {
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [visitTime, setVisitTime] = useState(new Date())
  const [chatLoad, setChatLoad] = useState({
    number: 1,
    done: false,
  })
  const [isNew, setIsNew] = useState(false);
  const { member } = useSelector(({ member }) => ({
    member: member.member,
  }));
  const { messageList, messageListError } = useSelector(({ chat }) => ({
    messageList: chat.messageList,
    messageListError: chat.messageListError,
  }));

  const state = useSelector((state) => ({ state }));
  // console.log(state);

  const socketRef = useRef();
  const messagesRef = useRef();

  const dispatch = useDispatch();

  // socket methods
  const receivedMessage = (message) => {
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
  };
  const sendMessage = (e) => {
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
  };

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
  };

  const addEmoji = (e) => {
    let emoji = e.native;
    this.setState({
      message: this.state.message + emoji,
    });
  };

  useEffect(() => {
    setVisitTime(new Date());
  }, [])

  // useEffect
  useEffect(() => {
    //리스너 추가
    console.log('리스너 추가하냐?')
    
    window.addEventListener('beforeunload', (event) => {
      try {
        console.log('새로고침할때다 여기는');
        const messageListFromLocalStorage = JSON.parse(
          localStorage.getItem('messages')
        );
        
        console.log(messageListFromLocalStorage);

        const newMessages = messageListFromLocalStorage.filter(
          (message) => {
            console.log(new Date(message.sendDate) >= visitTime);
            return(new Date(message.sendDate) >= visitTime)
          }
        );
        console.log(newMessages);

        dispatch(insertMessageList(newMessages)); //배열을 보냄
      } catch (e) {
        console.log(e);
      }
    });

    messagesRef.current.addEventListener('scroll', (e) => {
      const target = e.target;
      
      if(target.scrollTop === 0) {
        // alert('앙 꼭데기띠')
        dispatch(getMessageList(chatLoad.number));
        setChatLoad({...chatLoad, done: true})
      }
    })

    return () => {
      //리스너 제거
      setVisitTime(new Date());
      window.removeEventListener('beforeunload', () => {console.log('remove')});
    }
  }, [])

  useEffect(() => {

    if(chatLoad.done) {
      console.log('messageList, chatLoad바뀜');
      try {
        console.log('이리콤');
        const messageListFromLocalStorage = JSON.parse(localStorage.getItem('messages'))
        const newMessageList = messageListFromLocalStorage.concat(messageList)
          .sort((a, b) => {
            const aDate = new Date(a.sendDate);
            const bDate = new Date(b.sendDate);
            return aDate - bDate;
          });
        console.log(newMessageList);
        localStorage.setItem('messages', JSON.stringify(newMessageList));
        setMessages(newMessageList)
      } catch (e) {
        console.log(e)
      }

      setChatLoad({
        ...chatLoad,
        number: chatLoad.number++,
        done: false,
      })
      setIsNew(true)
    }
  }, [chatLoad, messageList])

  useEffect(() => {
    socketRef.current = io.connect('/');
    console.log('연결확인');
    socketRef.current.emit('joinRoom', member.coupleShareCode);
    socketRef.current.on('your id', (id) => {
      setYourID(id);
    });

    socketRef.current.on('message', (message) => {
      console.log('메세지보냄');
      // console.log(message);
      receivedMessage(message);
    });
  }, []);

  useEffect(() => {
    dispatch(getMessageList(0));
    console.log(messageList);

    return () => {
      console.log('페이지 나가요~');
      socketRef.current.emit('leaveRoom', member.coupleShareCode);
      socketRef.current.disconnect();
      try {
        const messageListFromLocalStorage = JSON.parse(
          localStorage.getItem('messages')
        );

        const newMessages = messageListFromLocalStorage.filter(
          (message) => new Date(message.sendDate) >= visitTime
        );
        console.log(newMessages);

        dispatch(insertMessageList(newMessages)); //배열을 보냄
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

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
    console.log('messageList가 바뀐다.');
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

  useEffect(() => {
    if (messagesRef !== null) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
    if(isNew) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight / 2
    }
  }, [messages]);

  useEffect(() => {
    if(isNew) {
      messagesRef.current.scrollTop = 0;
    }
  }, [isNew])

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
          handleChange={handleChange}
          handleKeyPress={handleKeyPress}
          message={message}
          messages={messages}
          member={member}
          chosenEmoji={chosenEmoji}
          onEmojiClick={onEmojiClick}
          addEmoji={addEmoji}
          sendMessage={sendMessage}
        />
      </Col>
    </Row>
  );
};

export default ChatContainer;
