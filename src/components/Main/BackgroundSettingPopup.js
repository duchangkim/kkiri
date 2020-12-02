import React, { Component } from 'react';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';

const MODAL_STYLES = {
  position: 'relative',
  top: `0`,
  left: `0`,
  fransform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  zIndex: 1500,
  borderRadius: 10,
};
const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.25)',
  zIndex: 1500,
};
const Popups = styled.div`
  *:focus {
    outline: none;
  }
  /* 배경화면 설정 팝업창 */
  .Background-Choice {
    position: absolute;
    z-index: 1000;
    top: 380px;
    left: 80%;
    transform: translateY(-40%);
    width: 400px;
    height: 450px;
    background-color: white;
    border-radius: 10px;
    // display: none;
  }
  .Background-Choice-Title {
    width: 100%;
    height: 15%;
    font-size: 1.4rem;
    text-align: center;
    background-color: rgba(255, 131, 141, 1);
    color: white;
    border-radius: 10px 10px 0px 0px / 10px 10px 0px 0px;
  }
  .Background-Choice-Title h4 {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .Choice-Popup_Close {
    position: relative;
    transform: rotate(45deg);
    left: 40%;
    top: -22px;
    width: 50px;
    height: 40px;
  }
  .Choice-Popup_Close:hover {
    cursor: pointer;
  }
  .Background-Choice-Image {
    width: 100%;
    height: 65%;
  }
  .Background-Choice-Image h4 {
    margin-top: 15px;
    margin-bottom: 15px;
    color: rgba(132, 132, 132, 1);
    text-align: center;
  }
  .Background-Choice-Image-Size {
    margin: 0 auto;
    width: 50%;
    height: 80%;
    border: 1px solid rgba(132, 132, 132, 1);
  }
  .Background-Choice-Image-Size img {
    width: 100%;
    height: 100%;
    background-image: cover;
  }
  .Background-Choice-Select {
    width: 100%;
    height: 19%;
    border-radius: 0px 0px 10px 10px / 0px 0px 10px 10px;
    text-align: center;
  }
  .Choice-Select-Text {
    position: relative;
    display: flex;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    width: 100%;
    height: 50px;
  }
  .choiceSelect {
    position: relative;
    top: 25%;
  }
  .Choice-File-Button {
    width: 50%;
    height: 100%;
  }
  .Choice-File-Button input[type='file'] {
    position: relative;
    left: 10%;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    outline: none;
  }
  .Choice-Save-Button {
    width: 30%;
    margin: 0 auto;
    height: 100%;
    border-radius: 10px;
    background-color: rgba(255, 131, 141, 1);
  }

  .Choice-Save-Button {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1rem;
    color: white;
    border: none;
    left: 8%;
    width: 100px;
    height: 25px;
    text-align: center;
    justify-content: center;
    border: 1px solid gray;
    align-content: center;
    border-radius: 20px;
    border: none;
    color: white;
    background-color: rgba(255, 131, 141, 1);
  }
  .Choice-Select-Text h4:hover {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    .Background-Choice {
      position: absolute;
      z-index: 1000;
      top: 300px;
      left: 10%;
      transform: translateY(-40%);
      width: 400px;
      height: 450px;
      background-color: white;
      border-radius: 10px;
    }
  }
`;

// 파일 선택 후 저장하기 -> uploads파일에 배경화면 이미지 보내기 -> DB에 파일값 저장 -> 배경화면 세팅하기

class BackgroundSettingPopup extends Component {
  state = {
    imgBase64:
      `${this.props.member.mainSetting.coupleBackground}` === ''
        ? `https://cdn.pixabay.com/photo/2018/04/04/14/45/design-3289984_960_720.png`
        : `http://localhost:3000/uploads/${this.props.member.coupleShareCode}/${this.props.member.mainSetting.coupleBackground}`,
    files: '',
    value: '',
  };

  handleChange = (event) => {
    let reader = new FileReader();
    reader.onloadend = (e) => {
      // 2. 읽기가 완료되면 아래코드가 실행
      const base64 = reader.result; //reader.result는 이미지를 인코딩(base64 ->이미지를 text인코딩)한 결괏값이 나온다.
      if (base64) {
        this.setState({
          imgBase64: base64.toString(), // 파일 base64 상태 업데이트
        });
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
      this.setState({
        files: event.target.files[0], // 파일 상태 업데이트 업로드 하는것은 파일이기 때문에 관리 필요
        value: event.target.files[0].name,
      });
    }
  };

  handlePost = () => {
    const formData = new FormData();
    formData.append('files', this.state.files, this.state.files.name);

    axios
      .post('/api/backgroundsetting/fileupload', formData)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  handleRemove = () => {
    this.setState({
      imgBase64:
        `${this.props.member.mainSetting.coupleBackground}` === ''
          ? `https://cdn.pixabay.com/photo/2018/04/04/14/45/design-3289984_960_720.png`
          : `http://localhost:3000/uploads/${this.props.member.coupleShareCode}/${this.props.member.mainSetting.coupleBackground}`,
      files: '',
      value: '',
    });
  };

  render() {
    return (
      <>
        <div style={OVERLAY_STYLES} />
        <div style={MODAL_STYLES}>
          <Popups>
            <div className="Background-Choice" id="Background-Choice">
              <div className="Background-Choice-Title">
                <h4>배경 화면 수정</h4>
                <AiOutlinePlus
                  className="Choice-Popup_Close"
                  onClick={this.props.handleBackgroundSettingOpenClick}
                />
              </div>
              <div className="Background-Choice-Image">
                <h4>배경이미지</h4>
                <div
                  className="Background-Choice-Image-Size"
                  id="image_container"
                >
                  {this.state.imgBase64 ? (
                    <img
                      src={this.state.imgBase64}
                      onClick={this.handleRemove}
                      alt="배경화면 사진"
                    ></img>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div className="Background-Choice-Select">
                <form
                  name="accountFrm"
                  className="choiceSelect"
                  onSubmit={this.handlePost}
                  encType="multipart/form-data"
                >
                  <div className="Choice-Select-Text">
                    <div className="Choice-File-Button">
                      <input
                        type="file"
                        name="files"
                        id="files"
                        accept="image/*"
                        className="ex_file"
                        onChange={this.handleChange}
                      />
                    </div>
                    <button type="submit" className="Choice-Save-Button">
                      저장하기
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Popups>
        </div>
      </>
    );
  }
}

export default BackgroundSettingPopup;
