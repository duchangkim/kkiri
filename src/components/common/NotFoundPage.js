import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFoundPageBlock = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #120f14;
  a {
    font-size: 50px;
    font-weight: bold;
  }
`;
const NotFoundMessage = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  color: #ffffff;
`;

const NotFoundPage = () => {
  return (
    <NotFoundPageBlock>
      <Link to="/kkiri/home">Kkiri 홈으로 돌아가기</Link>
      <img
        src="http://localhost:3000/not_found_image.png"
        alt="not found 고양이"
      />
      <NotFoundMessage>404 Not Found</NotFoundMessage>
    </NotFoundPageBlock>
  );
};

export default NotFoundPage;
