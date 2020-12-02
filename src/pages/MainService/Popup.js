import React, { Component } from 'react';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';

const Popups = styled.div`
  /* 배경화면 설정 팝업창 */
  .Background-Choice {
    position: absolute;
    z-index: 1000;
    top: 40%;
    left: 80%;
    transform: translateY(-40%);
    width: 400px;
    height: 450px;
    background-color: white;
    border-radius: 10px;
    display: none;
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
    background: url('../images/aaa.png') no-repeat center;
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

  .Choice-Save-Button button {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1rem;
    color: white;
  }
  .Choice-Select-Text h4:hover {
    cursor: pointer;
  }
`;

class Popup extends Component {
  state = {
    imgBase64:
      'https://cdn.pixabay.com/photo/2018/08/31/18/17/fantasy-3645263_1280.jpg', // 파일 base64
    imgFile: '', // 이미지파일
  };
  handleChangeFile = (event) => {
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
        imgFile: event.target.files[0], // 파일 상태 업데이트 업로드 하는것은 파일이기 때문에 관리 필요
      });
    }
  };
  handleSubmit = (event) => {
    alert('저장하기 눌리냐?');
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', event.target.file.files[0]);
    this.register(formData);
  };
  register = (regiInfo) => {
    fetch('http://localhost:4000/api/fileupload', {
      method: 'post',
      body: regiInfo,
    })
      .then((res) => res.json())
      .then((data) => alert(data.msg));
  };
  handleRemove = () => {
    this.setState({
      imgBase64:
        'https://cdn.pixabay.com/photo/2018/08/31/18/17/fantasy-3645263_1280.jpg',
      imgFile: null,
    });
  };

  render() {
    function Popup_Close() {
      document.getElementById('Background-Choice').style.display = 'none';
    }
    return (
      <Popups>
        <div className="Background-Choice" id="Background-Choice">
          <div className="Background-Choice-Title">
            <h4>배경 화면</h4>
            <AiOutlinePlus
              className="Choice-Popup_Close"
              onClick={Popup_Close}
            />
          </div>
          <div className="Background-Choice-Image">
            <h4>배경이미지</h4>
            <div className="Background-Choice-Image-Size" id="image_container">
              {this.state.imgBase64 ? (
                <img
                  src={this.state.imgBase64}
                  onClick={this.handleRemove}
                  alt=""
                ></img>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="Background-Choice-Select">
            <form
              name="accountFrm"
              onSubmit={this.handleSubmit}
              encType="multipart/form-data"
            >
              <div className="Choice-Select-Text">
                <div className="Choice-File-Button">
                  <input
                    type="file"
                    name="file"
                    id="ex_file"
                    className="ex_file"
                    onChange={this.handleChangeFile}
                  />
                </div>
                <div className="Choice-Save-Button">
                  <button type="submit">저장하기</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Popups>
    );
  }
}

export default Popup;
