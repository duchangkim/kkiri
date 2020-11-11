import { Row, Col } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import io from "socket.io-client";

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
      body: message,
      id: yourID,
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

  return (
    <Row className="main-contents m-0 p-0">
      <Col className="m-0 p-0">
        <ChattingBox>
          <div className="chatting-wrapper">
            <Container ref={messagesRef}>
              <p className="chattingDate">{today}</p>
              {messages.map((message, index) => {
                if (message.id === yourID) {
                  return (
                    <MyRow className="MyRow" key={index}>
                      <div className="profile">
                        <div className="name">김사과</div>
                      </div>

                      <MyMessage className="MyMessage">{message.body}</MyMessage>
                      <div className="Time">{time}</div>
                    </MyRow>
                  );
                }
                return (
                  <PartnerRow className="PartnerRow" key={index}>
                    <PartnerMessage className="PartnerMessage">{message.body}</PartnerMessage>
                    <div className="Time2">{time}</div>
                    <div className="profile2">
                      <div className="name">반하나</div>
                    </div>
                  </PartnerRow>
                );
              })}
            </Container>
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
          </div>
        </ChattingBox>
      </Col>
    </Row>
  );
};

export default Chatting;
