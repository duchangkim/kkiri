import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { IoIosTrash, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom';


const ReadBlock = styled.div`
    width: 70%;
    padding: 120px 0 0 0;
    margin: 0 auto;
    height: 75%;
    display: flex;
    align-items: center;
    @media(max-width: 1280px) {
        width: 90%;
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
    // background-color: rgba(255, 131, 141, 0.1);
    &:hover {
        cursor: pointer;
    }
`

const BoxHeader = styled.div`
    width:100%;
    height:10%;
    display: none;
`

const BoxBody = styled.div`
    width:100%;
    hegiht:90%;
    display: flex;
    align-items: center;
    img {
        margin: 0 auto;
        @media(max-width: 1280px) {
            width: 90%;
        }
        @media(max-width: 768px) {
            width: 100%;
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
    console.log('len : ' + len);
    return (
        <ReadBlock>
            <ArrowBackBox>
                {albumIdx > 0 && 
                <Link to={`${parseInt(albumIdx)-1}`}>
                    <IoIosArrowBack size="70" cursor="pointer" color="#faa2c1"/>
                </Link>
                }
            </ArrowBackBox>
            <ItemBox>
                <BoxHeader>
                    <IoIosTrash size="30"/>
                </BoxHeader>
                <BoxBody>
                <img src={`http://localhost:3000/uploads/${filename}`} alt={filename}/>
                </BoxBody>
            </ItemBox>
            <ArrowForwardBox>
                {albumIdx < len-1 &&
                <Link to={`${parseInt(albumIdx)+1}`}>
                    <IoIosArrowForward size="70" cursor="pointer" color="#faa2c1"/>
                </Link>
                }   
            </ArrowForwardBox>
        </ReadBlock>
    );
}

export default React.memo(ReadAlbum);