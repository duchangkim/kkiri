import React, {Component} from 'react';
import axios from 'axios';

class UploadButton extends Component {

  constructor(props){
    super(props);
    this.state = {
      files: '',
      fileImg: null,
      txt: null
    }
  }
  handleChange = (e) => {
    this.setState({
      files: e.target.files[0],
      fileImg: e.target.files[0].name
    })
  }
  handleChange2 = (e) => {
    this.setState({
      txt: e.target.value
    })
  }

  handlePost = async () => {
    const formData = new FormData();
    formData.append('files', this.state.files);
    formData.append('fileImg', this.state.fileImg);
    formData.append('txt', this.state.txt);

    console.log(formData);

    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data"
    //   }
    // }
    const res = await axios.post("/api/album/fileupload", formData).then(res => {
      console.log(res);
      alert('성공');

    }).catch(err => {
      console.log('err : '+ err);
      alert('실패')
    });
    console.log(res);
  }

  render() {
      return(
        <div className="middle">
          <input className="upload" disabled="disabled" value={this.state.fileImg}/>
          <label for="add_file">업로드</label>
          <input type="file" id="add_file" class="upload" name="files" onChange={this.handleChange}/>
          <div className="txt">
            <input type="text" placeholder="제목 입력하쇼" name="txt" onChange={this.handleChange2}/>
          </div>
          <div className="btn">            
              {this.state.fileImg === null ? (
                <button disabled="disable" style={{backgroundColor:"#dee2e6"}}>저장하기</button> 
                ) : ( <button type="submit" onClick={this.handlePost}>저장하기</button> )
              }            
          </div>
        </div>
      )
  }
}

export default UploadButton;
        