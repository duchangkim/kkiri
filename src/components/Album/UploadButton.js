import React, { Component } from 'react';
import axios from 'axios';

class UploadButton extends Component {
  state = {
    files: null,
    value: '',
  };

  handleChange = (event) => {
    this.setState({
      files: event.target.files[0],
      value: event.target.files[0].name,
    });
  };

  handlePost = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('files', this.state.files, this.state.files.name);

    axios
      .post('/api/albums/fileupload', formData)
      .then((res) => {
        window.location.href = 'http://localhost:3000/kkiri/albums';
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <form onSubmit={this.handlePost} encType="multipart/form-data">
        <div className="middle">
          <input
            className="upload"
            disabled="disabled"
            value={this.state.value}
          />
          <label htmlFor="files">업로드</label>
          <input
            type="file"
            id="files"
            className="upload"
            name="files"
            onChange={this.handleChange}
          />
          <div className="txt" />
          <div className="btn" style={{ paddingBottom: '15px' }}>
            {this.state.files === null ? (
              <button disabled="disable" style={{ backgroundColor: '#dee2e6' }}>
                저장하기
              </button>
            ) : (
              <button type="submit">저장하기</button>
            )}
          </div>
        </div>
      </form>
    );
  }
}

export default UploadButton;
