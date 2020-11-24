import React from "react";
import styled from "styled-components";

const LoadingPageBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @keyframes ldio-ckfywe494jw {
    0% {
      transform: scale(0.85);
    }
    5% {
      transform: scale(1);
    }
    39% {
      transform: scale(0.75);
    }
    45% {
      transform: scale(0.9);
    }
    60% {
      transform: scale(0.85);
    }
    100% {
      transform: scale(0.8);
    }
  }
  .ldio-ckfywe494jw > div {
    animation: ldio-ckfywe494jw 1.2987012987012987s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
    transform-origin: 100px 100px;
  }
  .ldio-ckfywe494jw > div div {
    top: 75.5px;
    left: 65px;
    position: absolute;
    width: 70px;
    height: 70px;
    background: #ff838d;
    transform: rotate(45deg);
  }
  .ldio-ckfywe494jw > div div:after,
  .ldio-ckfywe494jw > div div:before {
    content: " ";
    position: absolute;
    display: block;
    width: 70px;
    height: 70px;
    background: #ff838d;
  }
  .ldio-ckfywe494jw > div div:before {
    left: -45.5px;
    border-radius: 50% 0 0 50%;
  }
  .ldio-ckfywe494jw > div div:after {
    top: -45.5px;
    border-radius: 50% 50% 0 0;
  }
  .loadingio-spinner-heart-m7qe26sr3mk {
    width: 200px;
    height: 200px;
    display: inline-block;
    overflow: hidden;
    background: none;
  }
  .ldio-ckfywe494jw {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
  }
  .ldio-ckfywe494jw div {
    box-sizing: content-box;
  }
`;

const LoadingPage = () => {
  return (
    <LoadingPageBlock>
      <div className="loadingio-spinner-heart-m7qe26sr3mk">
        <div className="ldio-ckfywe494jw">
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </LoadingPageBlock>
  );
};

export default LoadingPage;
