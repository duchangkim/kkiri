import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { IoIosTrash, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

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
    color: rgba(255, 131, 141, 0.7);
`
const ArrowForwardBox = styled.div`
    width: 70px;
    height:100%;
    display: flex;
    align-items: center;
    color: rgba(255, 131, 141, 0.7);
`

const ItemBox = styled.div`
    width:90%;
    padding: 0;
    height: 100%;
    display: flex;
    align-items: center;

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

function ReadAlbum({ albums, albumId, albumIdx }) {
    console.log("%%%%%%%%"+albumId);
    console.log("%%%%%%%%"+albumIdx);
    const v = albumIdx;
    console.log("ㅃ라빠라ㅃ라ㅃㄹ" + albums);
    // console.dir(albums);
    console.log(albums.fileData);
    return (
      <ReadBlock>
        <ArrowBackBox>
            <IoIosArrowBack size="70" cursor="pointer"/>
        </ArrowBackBox>
        <ItemBox>
            <BoxHeader>
                <IoIosTrash size="30"/>
            </BoxHeader>
            <BoxBody>
                {/* <img src={`http://localhost:3000/uploads/${album.filename}`}></img> */}
            </BoxBody>
        </ItemBox>
        <ArrowForwardBox>
            <IoIosArrowForward size="70" cursor="pointer"/>
        </ArrowForwardBox>
      </ReadBlock>
    );
}

    
  

export default React.memo(ReadAlbum);