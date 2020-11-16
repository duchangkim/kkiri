import { Row, Col } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import { useSelector } from "react-redux";

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
  ::-webkit-scrollbar {
    display: none;
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

const Chatting = () => {
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);

  console.log(messages);

  const { member } = useSelector(({ member }) => ({
    member: member.member,
  }));

  // api 만들고
  // 클라이언트 api (axios) 만들고
  // reducer 만들고
  // 컴포넌트에서 dispatch()

  const socketRef = useRef();
  console.log(socketRef + "socketRef");

  useEffect(() => {
    socketRef.current = io.connect("/");
    console.log("연결확인");
    socketRef.current.on("your id", (id) => {
      setYourID(id);
    });

    socketRef.current.on("message", (message) => {
      console.log("메세지보냄");
      console.log(message);
      receivedMessage(message);
    });
  }, []);

  const messagesRef = useRef();
  // 메세지 스크롤 하단 고정
  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  function receivedMessage(message) {
    setMessages((oldMsgs) => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      // body: message,
      // id: member._id,
      // name: member.name,
      coupleShareCode: member.coupleShareCode,
      sender: member._id,
      name: member.name,
      text: message,
      sendDate: new Date(Date.now()),
    };
    setMessage("");
    socketRef.current.emit("send message", messageObject);
  }

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
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

  // const messageO = [
  //   {
  //     sender: "5fade54567f84b05d4f2d8f8",
  //     name: "이메론",
  //     text: "안녕",
  //     sendDate: new Date("2020-11-12T13:06:42.119Z"),
  //   },
  //   {
  //     sender: "5fade50d67f84b05d4f2d8f7",
  //     name: "김사과",
  //     text: "하세요ㅕ",
  //     sendDate: new Date("2020-11-12T13:06:42.415Z"),
  //   },
  //   {
  //     sender: "5fade50d67f84b05d4f2d8f7",
  //     name: "김사과",
  //     text: "123123",
  //     sendDate: new Date("2020-11-12T13:06:53.675Z"),
  //   },
  //   {
  //     sender: "5fade50d67f84b05d4f2d8f7",
  //     name: "김사과",
  //     text: "123",
  //     sendDate: new Date("2020-11-12T13:11:07.118Z"),
  //   },
  //   {
  //     sender: "5fade54567f84b05d4f2d8f8",
  //     name: "이메론",
  //     text: "12기기기기기3",
  //     sendDate: new Date("2020-11-12T13:25:33.934Z"),
  //   },
  //   {
  //     sender: "5fade50d67f84b05d4f2d8f7",
  //     name: "김사과",
  //     text: "1거고고ㅓ고23",
  //     sendDate: new Date("2020-11-12T13:25:37.934Z"),
  //   },
  // ];

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours(); // 시
  const minutes = date.getMinutes(); // 분
  const today = year + "년 " + month + "월 " + day + "일";
  let timehours = "";
  if (hours <= 12 && hours >= 24) {
    timehours = "오전" + hours;
  } else {
    timehours = "오후" + hours;
  }
  let timeminutes = "";
  if (minutes < 10) {
    timeminutes = "0" + minutes + "분";
  } else {
    timeminutes = minutes + "분";
  }
  const time = timehours + ":" + timeminutes;

  const dateFormat = (sendDate) => {
    console.log(sendDate);
    return `${new Date(sendDate).getHours()}시 : ${new Date(sendDate).getMinutes()}분`;
  };

  return (
    <Row className="main-contents m-0 p-0">
      <Col className="m-0 p-0">
        <ChattingBox>
          <div className="chatting-wrapper">
            <Container ref={messagesRef}>
              <p className="chattingDate">{today}</p>
              {messages.map((message, index) => {
                if (message.sender === member._id) {
                  return (
                    <MyRow className="MyRow" key={index}>
                      <div className="profile">
                        <div className="name">{message.name}</div>
                      </div>
                      <MyMessage className="MyMessage">{message.text}</MyMessage>
                      <div className="Time">{dateFormat(message.sendDate)}</div>
                    </MyRow>
                  );
                }
                return (
                  <PartnerRow className="PartnerRow" key={index}>
                    <PartnerMessage className="PartnerMessage">{message.text}</PartnerMessage>
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
