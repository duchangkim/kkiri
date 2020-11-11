import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { IoIosTrash, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const ReadBlock = styled.div`
    width: 80%;
    padding: 80px 50px 50px 50px;
    margin: 0 auto;
    height: 85%;
    display: flex;
    align-items: center;
`;
const ArrowBackBox = styled.div`
    // width:10%;
    height:100%
    display: flex;
    align-items: center;
`
const ArrowForwardBox = styled.div`
    // width: 10%;
    height:100%
    display: flex;
    align-items: center;
`

const ItemBox = styled.div`
    width:90%;
    padding: 0;
    height: 100%;
    border: 1px solid #ccc;
`

const BoxHeader = styled.div`
    width:100%;
    height:10%;
`

const BoxBody = styled.div`
    width:100%;
    hegiht:90%;
`

function ReadAlbum({ }) {
    return (
      <ReadBlock>
        <ArrowBackBox>
            <IoIosArrowBack size="70" color="orange"/>
        </ArrowBackBox>
        <ItemBox>
            <BoxHeader>
                <IoIosTrash size="30"/>
            </BoxHeader>
            <BoxBody>
                
            </BoxBody>
        </ItemBox>
        <ArrowForwardBox>
            <IoIosArrowForward size="70" color="orange"/>
        </ArrowForwardBox>
      </ReadBlock>
    );
}

    
  

export default React.memo(ReadAlbum);