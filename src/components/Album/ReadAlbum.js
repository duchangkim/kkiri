import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import ActionButtons from "./ActionButtons";
import { removeFile, editFile } from "../../lib/api/album";
import Button from "../common/Button";

const ReadBlock = styled.div`
  width: 70%;
  padding: 0;
  margin: 0 auto;
  height: 65%;
  display: flex;
  align-items: center;
  @media (max-width: 1200px) {
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
    @media (max-width: 1200px) {
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

function ReadAlbum({ album, error, loading, albumIdx, coupleShareCode }) {
  // const dispatch = useDispatch();
  // console.log('555555555');
  // console.log(albumIdx)
  // console.log(typeof albumIdx);
  let abc = Number(albumIdx);
  // console.log(typeof abc);
  if (error) {
    if (error.response && error.response.status === 404) {
      return <ReadBlock>존재하지 않는 포스트입니다.</ReadBlock>;
    }
    return <ReadBlock>오류 발생!</ReadBlock>;
  }

  if (loading || !album) {
    return null; // 그냥넘어가~
  }

  const { fileData } = album;
  const len = fileData.files.length;
  console.log(typeof len);
  // console.log(typeof len);
  const filename = fileData.files[albumIdx].filename;
  // console.log(abc < len ? abc : (abc-1));
  const likes = fileData.files[albumIdx].like;

  const onRemove = async () => {
    try {
      console.log(albumIdx);
      await removeFile(albumIdx)
        .then((res) => {
          console.log("삭제성공!");
          
          len > 1 ? window.location.href = `http://localhost:3000/kkiri/albums/${
            abc < len - 1 ? abc : abc - 1
          }` : window.location.href =  `http://localhost:3000/kkiri/albums`;
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const asd = Date.now();
  console.log(typeof asd);
  const keyid = fileData.files[albumIdx].keyid;

  const onEdit = async () => {
    await editFile(keyid)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("coupleShareCode -> " + coupleShareCode)
  console.log(filename.split('.').pop().toLowerCase());
  const extens = filename.split('.').pop().toLowerCase();

  return (
    <>
      <ActionButtons onEdit={onEdit} onRemove={onRemove} likes={likes} />
      <ReadBlock>
        <ArrowForwardBox>
          {albumIdx < len - 1 && (
            <Link to={`${parseInt(albumIdx) + 1}`}>
              <IoIosArrowBack size="70" cursor="pointer" color="#ffb6c1" />
            </Link>
          )}
        </ArrowForwardBox>
        <ItemBox>
          <BoxBody>
            {(extens == 'mp4' | extens == 'm4v' | extens == 'avi' | extens == 'flv' | extens == 'mkv' | extens == 'mov') ? 
              <video src={`http://localhost:3000/uploads/${coupleShareCode}/${filename}`} alt={filename} style={{width: "100%", height: "300px"}} controls/> :
            
              <img src={`http://localhost:3000/uploads/${coupleShareCode}/${filename}`} alt={filename} />
            }
          </BoxBody>
        </ItemBox>
        <ArrowBackBox>
          {albumIdx > 0 && (
            <Link to={`${parseInt(albumIdx) - 1}`}>
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

export default React.memo(ReadAlbum);
