import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

const TitleBlock = styled.div`
  width: 70%;
  height: 96px;
  padding-top: 40px;
  text-align: center;
  margin: 0 auto;
  div {
    width: 140px;
    height: 32px;
    background-color: #ffb6c1;
    margin: 0 auto;
    color: white;
    font-weight: bold;
    border-radius: 4px;
    padding: 0.25rem 1rem;
  }
`;
const ReadBlock = styled.div`
  width: 70%;
  padding: 0;
  margin: 0 auto;
  height: 65%;
  display: flex;
  align-items: center;
  @media (max-width: 1080px) {
    width: 80%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const ArrowBackBox = styled.div`
  width: 70px !important;
  height: 100%;
  display: flex;
  align-items: center;
`;
const ArrowForwardBox = styled.div`
  width: 70px;
  height: 100%;
  display: flex;
  align-items: center;
`;
const ItemBox = styled.div`
  width: 90%;
  padding: 0;
  height: 100%;
  display: flex;
  align-items: center;
`;
const BoxBody = styled.div`
  width: 100%;
  // height:90%;
  display: flex;
  align-items: center;
  img {
    z-index: -9999;
    margin: 0 auto;
    max-width: 700px;
    max-height: 500px;
    @media (max-width: 1080px) {
      width: 100%;
      // height: 500px;
    }
    @media (max-width: 768px) {
      width: 90%;
    }
  }
`;
const HomeBlock = styled.div`
  width: 70%;
  margin: 0 auto;
  text-align: center;
`;
const HomeButton = styled.button`
  border: none;
  border-radius: 4px;
  width: 135px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: #ffb6c1;

  &:hover {
    background: #ff4d67;
  }
`;

function LikeReadAlbum({ album, error, loading, albumIdx, coupleShareCode }) {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <ReadBlock>존재하지 않는 포스트입니다.</ReadBlock>;
    }
    return <ReadBlock>오류 발생!</ReadBlock>;
  }

  if (loading || !album) {
    return null; // 그냥넘어가~
  }

  let arr2 = [];
  album.fileData.files.reverse().map((file, index) => {
    const extens = file.filename.split('.').pop().toLowerCase();
    if (
      (extens === 'mp4') |
      (extens === 'm4v') |
      (extens === 'avi') |
      (extens === 'flv') |
      (extens === 'mkv') |
      (extens === 'mov')
    ) {
      arr2 = arr2.concat({
        id: index,
        keyid: file.keyid,
        filename: file.filename,
        like: file.like,
      });
    }
  });
  const len2 = arr2.length;
  const extens = arr2[albumIdx].filename.split('.').pop().toLowerCase();
  return (
    <>
      <TitleBlock>
        <div>동영상이에용~</div>
      </TitleBlock>
      <ReadBlock>
        <ArrowForwardBox>
          {albumIdx > 0 && (
            <Link to={`${parseInt(albumIdx) - 1}`}>
              <IoIosArrowBack size="70" cursor="pointer" color="#ffb6c1" />
            </Link>
          )}
        </ArrowForwardBox>
        <ItemBox>
          <BoxBody>
            {(extens === 'mp4') |
              (extens === 'm4v') |
              (extens === 'avi') |
              (extens === 'flv') |
              (extens === 'mkv') |
              (extens === 'mov') && (
              <video
                src={`http://localhost:3000/uploads/${coupleShareCode}/${arr2[albumIdx].filename}`}
                alt={arr2[albumIdx].filename}
                style={{ width: '100%', height: '300px' }}
                controls
              />
            )}
          </BoxBody>
        </ItemBox>
        <ArrowBackBox>
          {albumIdx < len2 - 1 && (
            <Link to={`${parseInt(albumIdx) + 1}`}>
              <IoIosArrowForward size="70" cursor="pointer" color="#ffb6c1" />
            </Link>
          )}
        </ArrowBackBox>
      </ReadBlock>
      <HomeBlock>
        <Link to="/kkiri/albums">
          <HomeButton>앨범 전체보기</HomeButton>
        </Link>
      </HomeBlock>
    </>
  );
}

export default React.memo(LikeReadAlbum);
