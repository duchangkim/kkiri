import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { IoIosTrash, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom';

const UpdBlock = styled.div`
    width: 70%;
    padding-top: 40px;
    text-align: center;
    margin: 0 auto;
`

const Btn = styled.button`
    border: none;
    border-radius: 4px;
    width: 47%;
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
`

const ReadBlock = styled.div`
    width: 70%;
    padding: 50px 0 0 0;
    margin: 0 auto;
    height: 75%;
    display: flex;
    align-items: center;
    @media(max-width: 1080px) {
        width: 70%;
    }
    @media(max-width: 768px) {
        width: 100%;
    }
`;
const ArrowBackBox = styled.div`
    width: 70px;
    height:100%;
    display: flex;
    align-items: center;
`
const ArrowForwardBox = styled.div`
    width: 70px;
    height:100%;
    display: flex;
    align-items: center;
`

const ItemBox = styled.div`
    width:90%;
    padding: 0;
    height: 100%;
    display: flex;
    align-items: center;
`

const BoxBody = styled.div`
    width:100%;
    hegiht:90%;
    display: flex;
    align-items: center;
    img {
        z-index: -9999;
        margin: 0 auto;
        @media(max-width: 1080px) {
            width: 100%;
        }
        @media(max-width: 768px) {
            width: 90%;
        }
    }
`

function ReadAlbum({ album, error, loading, albumIdx }) {
    console.log('555555555');
    console.log(albumIdx);
    if(error) {
        if(error.response && error.response.status === 404) {
            return <ReadBlock>존재하지 않는 포스트입니다.</ReadBlock>
        }
        return <ReadBlock>오류 발생!</ReadBlock>
    }
    
    if(loading || !album) {
        return null; // 그냥넘어가~
    }
    
    const { fileData } = album;
    const filename = fileData.files[albumIdx].filename;
    const len = fileData.files.length;
    
    const delete1 = () => {
        alert('정말 삭제하시겠습니까?');
        window.location.href=`http://localhost:3000/kkiri/albums/${albumIdx > 0 ? parseInt(albumIdx)-1 : parseInt(albumIdx)+1}`;
    }
    return (
        <>
        <UpdBlock>
            <Btn><IoIosTrash size="25"/>즐겨찾기</Btn> <Btn onClick={delete1}>삭제<IoIosTrash size="25"/></Btn>
        </UpdBlock>
        <ReadBlock>
            <ArrowBackBox>
                {albumIdx > 0 && 
                <Link to={`${parseInt(albumIdx)-1}`}>
                    <IoIosArrowBack size="70" cursor="pointer" color="#ffb6c1"/>
                </Link>
                }
            </ArrowBackBox>
            <ItemBox>
                <BoxBody>
                <img src={`http://localhost:3000/uploads/${filename}`} alt={filename}/>
                </BoxBody>
            </ItemBox>
            <ArrowForwardBox>
                {albumIdx < len-1 &&
                <Link to={`${parseInt(albumIdx)+1}`}>
                    <IoIosArrowForward size="70" cursor="pointer" color="#ffb6c1"/>
                </Link>
                }   
            </ArrowForwardBox>
        </ReadBlock>
        </>
    );
}

export default React.memo(ReadAlbum);