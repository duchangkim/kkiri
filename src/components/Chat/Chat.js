import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import * as _date from '../../lib/_date';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import { Button } from 'react-bootstrap';

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
    &:hover {
      cursor: pointer;
    }
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
  .btn-open {
    position: relative;
    left: 35%;
    top: 14%;
  }
  .emoji-picker-react {
    width: 100%;
    height: 160px;
  }
  .emoji-search {
    display: none;
  }
  .Profile-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  @media ${(props) => props.theme.middle} {
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
      font-size: 1.05rem;
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

  button {
    margin-bottom: 30px;
    &:hover {
      background: #d4d4d480;
    }
    &:focus {
      box-shadow: none;
    }
  }
`;
const MessageLine = styled.div`
  // position: relative;
  // margin-top: -30px;
  display: flex;
  justify-content: ${({ myMessage }) =>
    myMessage ? `flex-end` : `flex-start`};
`;
const MessageBlock = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 40%;
  align-items: ${({ myMessage }) => (myMessage ? `flex-end` : `flex-start`)};
`;
const Profile = styled.div`
  box-sizing: border-box;
  width: 45px;
  height: 45px;
  border: 5px solid #ffffff;
  border-radius: 50%;
  background: #ff838d;
`;
const Name = styled.div`
  position: relative;
  top: -38px;
  right: 50px;
  width: 80%;
  text-align: right;
  ${({ myMessage }) =>
    myMessage
      ? css`
          right: 50px;
          text-align: right;
        `
      : css`
          left: 50px;
          text-align: left;
        `};
`;
const Message = styled.div`
  box-sizing: border-box;
  position: relative;
  top: -35px;
  min-width: 10%;
  max-width: 80%;
  padding: 12px 15px;
  border-radius: 5px;
  background-color: lightblue;
  z-index: -1;
  line-height: 1.6rem;
  word-wrap: break-word; /* IE 5.5-7 */
  white-space: -moz-pre-wrap; /* Firefox 1.0-2.0 */
  white-space: pre-wrap; /* current browsers */

  .time {
    min-width: 60px;
    position: absolute;
    bottom: -5px;
    color: #7f7f7f;
    font-size: 0.7rem;
  }
  ${({ myMessage }) =>
    myMessage
      ? css`
          right: 5px;
          padding-right: 10px;
          .time {
            left: -60px;
          }
        `
      : css`
          right: -5px;
          padding-right: 15px;
          .time {
            right: -65px;
          }
        `};
`;
const TimeAssortmentMessage = styled.div`
  text-align: center;
  color: #7f7f7f;
  margin: 20px 0;
`;

const Chat = ({
  messagesRef,
  messages,
  member,
  chosenEmoji,
  onEmojiClick,
  sendMessage,
  message,
  handleChange,
  handleKeyPress,
  onMoreButtonClick,
  messageListLoad,
}) => {
  const [emojiNationOpen, setemojiNationOpen] = useState(false);
  const handleEmojiNationOpenClick = () => setemojiNationOpen(!emojiNationOpen);
  // console.log("채팅 이미지 호출 " + member.mainSetting.coupleProfile1);

  return (
    <ChattingBox>
      <div className="chatting-wrapper">
        <Container ref={messagesRef} messages={messages}>
          {messageListLoad ? null : (
            <Button variant="outline" onClick={onMoreButtonClick}>
              더보기
            </Button>
          )}
          {messages.map((message, index) => {
            const currentSendDate = message.sendDate.substring(0, 10);
            let nextSendDate;
            if (messages.length - 1 === index) {
              nextSendDate = messages[index].sendDate.substring(0, 10);
            } else {
              nextSendDate = messages[index + 1].sendDate.substring(0, 10);
            }
            // console.log(message.sendDate.substring(0, 10));
            // console.log(`${currentSendDate} / ${nextSendDate}`);

            if (currentSendDate !== nextSendDate) {
              const _date = new Date(nextSendDate);
              return (
                <TimeAssortmentMessage key={index}>{`${_date.getFullYear()}년 ${
                  _date.getMonth() + 1
                }월 ${_date.getDate()}일`}</TimeAssortmentMessage>
              );
            }
            return message.sender === member._id ? (
              <MessageLine key={index} myMessage>
                <MessageBlock myMessage>
                  <Profile>
                    <img
                      src={
                        member.mainSetting.coupleProfile1
                          ? `http://localhost:3000/uploads/${member.coupleShareCode}/${member.mainSetting.coupleProfile1}`
                          : `https://cdn0.iconfinder.com/data/icons/user-collection-4/512/user-128.png`
                      }
                      className="Profile-img"
                      alt="my profile"
                    />
                  </Profile>
                  <Name myMessage>{message.name}</Name>
                  <Message myMessage>
                    {message.text}
                    <div className="time">
                      {_date.dateFormat(message.sendDate)}
                    </div>
                  </Message>
                </MessageBlock>
              </MessageLine>
            ) : (
              <MessageLine key={index}>
                <MessageBlock>
                  <Profile>
                    <img
                      src={
                        member.mainSetting.coupleProfile2
                          ? `http://localhost:3000/uploads/${member.coupleShareCode}/${member.mainSetting.coupleProfile2}`
                          : `https://cdn0.iconfinder.com/data/icons/user-collection-4/512/user-128.png`
                      }
                      className="Profile-img"
                      alt="you profile"
                    />
                  </Profile>
                  <Name>{message.name}</Name>
                  <Message>
                    {message.text}
                    <div className="time">
                      {_date.dateFormat(message.sendDate)}
                    </div>
                  </Message>
                </MessageBlock>
              </MessageLine>
            );
          })}
        </Container>
        {emojiNationOpen ? (
          <div className="emojiNation">
            {chosenEmoji ? (
              <span>Chosen Emoji: {chosenEmoji.emoji}</span>
            ) : (
              <span>No Emoji Chosen</span>
            )}
            <Picker
              onEmojiClick={onEmojiClick}
              preload={true}
              skinTone={SKIN_TONE_MEDIUM_DARK}
              handleEmojiNationOpenClick={handleEmojiNationOpenClick}
            />
          </div>
        ) : null}
        <div className="chatting-send">
          <form onSubmit={sendMessage}>
            <div className="btn-plus" onClick={handleEmojiNationOpenClick}>
              <div className="btn-open">+</div>
            </div>
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
  );
};

export default Chat;
