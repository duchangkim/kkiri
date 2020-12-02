import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  .logo-area {
    display: block;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 10px #fefefe;
  width: 420px;
  background: white;
  border-radius: 2px;
  .kkirilogo {
    margin-top: 50px;
    font-family: MaplestoryOTFBold;
    font-size: 2.5rem;
    color: rgba(255, 131, 141, 1);
    text-decoration: none;
  }

  @font-face {
    font-family: 'MaplestoryOTFBold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFBold.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <div className="logo-area">
          <Link to="/" className="kkirilogo">
            kkiri
          </Link>
        </div>
        {children}
      </WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
