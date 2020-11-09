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
  .chatting-area {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    border-top: 3px solid #efefef;
    border-bottom: 3px solid #efefef;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .chatting-area p {
    padding-top: 10px;
    text-align: center;
    color: #6b6b6b;
  }
  /* 대화 공통 */
  .message-wrpper {
    position: relative;
    width: 100%;
    margin-bottom: 40px;
  }

  .message-wrpper .profile {
    width: 45px;
    height: 45px;
    border: 4px solid #ffffff;
    border-radius: 50%;
    background-color: thistle;
  }

  .message-wrpper p {
    box-sizing: border-box;
    /* width: 25%; */
    max-width: 50%;
    min-height: 40px;
    max-height: 600px;
    padding: 15px 20px;
    border-radius: 3px;
    background: blanchedalmond;
    color: #333333;
    text-align: unset;
  }

  /* 상대방 대화 */
  .message-wrpper.contact .profile span {
    position: relative;
    left: 50px;
    top: 3px;
    font-size: 14px;
    display: block;
    width: 100px;
    text-align: left;
  }
  .message-wrpper.contact p {
    position: absolute;
    z-index: -1;
    left: 25px;
    top: 30px;
    word-break: keep-all;
    word-break: break-all;
  }
  /* 본인 대화 */
  .message-wrpper.me {
    display: flex;
    flex-direction: row-reverse;
  }
  .message-wrpper.me .profile span {
    position: relative;
    left: -110px;
    top: 3px;
    font-size: 14px;
    display: block;
    width: 100px;
    text-align: right;
  }
  .message-wrpper.me p {
    position: absolute;
    z-index: -1;
    right: 25px;
    top: 30px;
    word-break: keep-all;
    word-break: break-all;
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
  }
`;

const Chatting = () => {
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socketRef = useRef();
  console.log(socketRef);

  useEffect(() => {
    socketRef.current = io.connect("/");

    socketRef.current.on("your id", (id) => {
      setYourID(id);
    });

    socketRef.current.on("message", (message) => {
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
  return (
    <Row className="main-contents m-0 p-0">
      <Col className="m-0 p-0">
        <ChattingBox>
          <div className="chatting-wrapper">
            <div className="chatting-area" ref={messagesRef}>
              <p>2020년 11월 08일</p>
              {messages.map((message, index) => {
                if (message.id === yourID) {
                  return (
                    <div className="message-wrpper me" key={index}>
                      <div className="profile">
                        <span>내꺼</span>
                      </div>
                      <p>{message.body}</p>
                    </div>
                  );
                }
                return (
                  <div className="message-wrpper contact" key={index}>
                    <div className="profile">
                      <span>상대방꺼</span>
                    </div>
                    <p>{message.body}</p>
                  </div>
                );
              })}
            </div>
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
