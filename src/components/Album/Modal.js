import React from "react";
import styled from "styled-components";
import UploadButton from "./UploadButton";

const MODAL_STYLES = styled.div`
  position: relative;
  top: 0;
  left: 0;
  fransform: translate(-50%, -50%);
  background: #FFF;
  z-index: 1500;
  border-radius: 10px;
  width: 30%;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 90%;
  }
  
`;

const  OVERLAY_STYLES= styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 1500;
`;

const ModalStyle = styled.div`
  .title {
    width: 100%;
    height: 50px !important;
    background-color: rgba(255, 131, 141, 1);
    border-radius: 10px 10px 0 0;
    // box-sizing: border-box;
    color: white;
    display: flex;
    padding: 10px 0 10px 0;
  }
  .pt1 {
    width: 100%;
    font-weight: bold;
    font-size: 22px;
    padding-left: 13%;
  }
  .pt2 {
    width: 10%;
    margin-top: 2px;
    cursor: pointer;
    right: 5px;
  }
  .img1 {
    width: 30px;
    height: 30px;
  }
  .middle {
    padding-top: 20px;
  }
  .middle label {
    display: inline-block;
    padding: 0.5em 0.75em;
    color: #fff;
    font-size: inherit;
    line-height: normal;
    background-color: #5cb85c;
    cursor: pointer;
    border: 1px solid #ebebeb;
    border-radius: 0.25em;
    border: 1px solid #ebebeb;
  }
  .middle input {
    height: 36px;
    width: 63%;
    margin-right: -1%;
  }
  .middle input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  .txt {
    padding: 10px 0 10px 0;
  }
  .txt input {
    width: 350px;
    height: 35px;
    border: none;
    border-radius: 5px;
    background-color: rgba(255, 131, 141, 1);
  }
  .txt input::placeholder {
    padding-left: 15px;
    color: white;
  }
  .btn {
    padding-top: 5px;
  }
  .btn button {
    border: none;
    font-size: 18px;
    background-color: rgba(255, 131, 141, 1);
    width: 120px;
    height: 35px;
    color: white;
    font-weight: bold;
    border-radius: 7px;
  }
`;

export default function Modal({ open, children, onClose }) {
  if (!open) return null;

  return (
    <>
      <OVERLAY_STYLES/>
      <MODAL_STYLES>
        <ModalStyle>
          <div className="title">
            <div className="pt1">사진추가</div>
            <div className="pt2" onClick={onClose}>
              <img
                src={require("../../images/KakaoTalk_20200923_2021304122.png")}
                alt="exit"
                className="img1"
              />
            </div>
          </div>
          <UploadButton />
        </ModalStyle>
        {children}
      </MODAL_STYLES>
    </>
  );
}
