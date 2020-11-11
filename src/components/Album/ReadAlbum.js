import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { IoIosTrash } from 'react-icons/io'

const ReadBlock = styled.div`
    width: 80%;
    padding: 50px;
    margin: 0 auto;
    height: 85%;
`;

const ItemBox = styled.div`
    width:100%;
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
        <ItemBox>
            <BoxHeader>
                <IoIosTrash size="30"/>
            </BoxHeader>
            <BoxBody>
                
            </BoxBody>
        </ItemBox>
      </ReadBlock>
    );
}

    
  

export default React.memo(ReadAlbum);