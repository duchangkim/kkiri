import React, { Component } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";

const MODAL_STYLES = {
  position: "relative",
  top: `0`,
  left: `0`,
  fransform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  zIndex: 1500,
  borderRadius: 10,
};
const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.25)",
  zIndex: 1500,
};

const ProfilePopups = styled.div`
  *:focus {
    outline: none;
  }
  * {
    list-style: none;
  }
  .Profile-Choice {
    position: absolute;
    z-index: 1000;
    top: 380px;
    left: 35%;
    transform: translateY(-40%);
    width: 400px;
    height: 450px;
    background-color: white;
    border-radius: 10px;
  }
  .Profile-Choice-Title {
    width: 100%;
    height: 15%;
    font-size: 1.4rem;
    text-align: center;
    background-color: rgba(255, 131, 141, 1);
    color: white;
    border-radius: 10px 10px 0px 0px / 10px 10px 0px 0px;
  }
  .Profile-Choice-Title h4 {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .Profile_Close {
    position: relative;
    transform: rotate(45deg);
    left: 40%;
    top: -22px;
    width: 50px;
    height: 40px;
  }
  .Profile_Close:hover {
    cursor: pointer;
  }

  .MyProfile {
    width: 100%;
    height: 85%;
    display: flex;
    border-radius: 0px 0px 10px 10px / 0px 0px 10px 10px;
  }
  .ProfileIMG {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .ProfileIMG img {
    width: 100%;
    height: 100%;
    border-radius: 0px 0px 10px 10px / 0px 0px 10px 10px;
  }

  @media (max-width: 768px) {
    .Profile-Choice {
      position: absolute;
      z-index: 1000;
      top: 300px;
      left: 20%;
      transform: translateY(-40%);
      width: 400px;
      height: 450px;
      background-color: white;
      border-radius: 10px;
    }
  }
`;

class ChatProfile2 extends Component {
  state = {
    imgBase64:
      `${this.props.member.mainSetting.coupleProfile2}` === ""
        ? `https://cdn0.iconfinder.com/data/icons/user-collection-4/512/user-128.png`
        : `http://localhost:3000/uploads/${this.props.member.coupleShareCode}/${this.props.member.mainSetting.coupleProfile2}`,
    files: "",
    value: "",
  };

  render() {
    console.dir(this.props.member + "맴버");
    console.log(this.props.member.coupleId + "네임");
    return (
      <>
        <div style={OVERLAY_STYLES} />
        <div style={MODAL_STYLES}>
          <ProfilePopups>
            <div className="Profile-Choice" id="Profile-Choice">
              <div className="Profile-Choice-Title">
                <h4>프로필 사진</h4>
                <AiOutlinePlus
                  className="Profile_Close"
                  onClick={this.props.handleChatProfile2OpenClick}
                />
              </div>
              <div className="MyProfile">
                <div className="ProfileIMG">
                  {this.state.imgBase64 ? (
                    <img src={this.state.imgBase64} alt="프로필 사진"></img>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </ProfilePopups>
        </div>
      </>
    );
  }
}

export default ChatProfile2;
