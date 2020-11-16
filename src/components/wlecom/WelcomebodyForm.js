import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Image, Form } from 'react-bootstrap';
import { Input } from 'reactstrap';

const WelcomeFormBlock = styled.div`
  width: 100%;
  body {
    font-family: Verdana, sans-serif;
    margin: 0;
  }
  .mySlides {
    display: none;
  }
  img {
    vertical-align: middle;
  }
  .slideshow_container {
    background: rgba(255, 131, 141, 1);
    max-width: 100%;
    position: relative;
    margin: auto;
    height: 70vh;
  }

  /* Next & previous buttons */
  .prev,
  .next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    padding: 16px;
    margin-top: -22px;
    color: white;
    font-weight: bold;
    font-size: 18px;
    transition: 0.6s ease;
    border-radius: 0 3px 3px 0;
  }
  .prev {
    left: 0;
    border-radius: 3px 0 0 3px;
  }
  .next {
    right: 0;
    border-radius: 3px 0 0 3px;
  }

  /* On hover, add a black background color with a little bit see-through */
  .prev:hover,
  .next:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  /* Caption text */
  .text {
    color: #f2f2f2;
    font-size: 15px;
    padding: 8px 12px;
    position: absolute;
    bottom: 8px;
    width: 100%;
    text-align: center;
  }

  /* Number text (1/3 etc) */
  .numbertext {
    color: #f2f2f2;
    font-size: 12px;
    padding: 8px 12px;
    position: absolute;
    top: 0;
  }

  /* The dots/bullets/indicators */
  .dot {
    cursor: pointer;
    height: 15px;
    width: 15px;
    margin: 0 2px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
  }

  .active,
  .dot:hover {
    background-color: #717171;
  }

  /* Fading animation */
  .fade {
    -webkit-animation-name: fade;
    -webkit-animation-duration: 1.5s;
    animation-name: fade;
    animation-duration: 1.5s;
  }

  @-webkit-keyframes fade {
    from {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade {
    from {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }

  /* On smaller screens, decrease text size */
  @media only screen and (max-width: 300px) {
    .prev,
    .next,
    .text {
      font-size: 11px;
    }
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    &:hover {
      color: ${palette.gray[9]};
    }
  }
  .ma_ra {
    float: left;
    text-decoration: underline;
  }
  .ma_le {
    float: right;
    text-decoration: underline;
  }
`;

const WelcomebodyForm = ({ form, onChange, onSubmit, error }) => {
  return (
    <WelcomeFormBlock>
      <div className="slideshow_container">
        <Container>
          <Row>
            <Col className="mySlides fade">
              <div class="numbertext">1 / 3</div>
              <div class="text">Caption Text</div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col className="mySlides fade">
              <div class="numbertext">2 / 3</div>
              <div class="text">Caption Text</div>
            </Col>
          </Row>
          </Container>
        <Container>
          <Row>
            <Col className="mySlides fade">
              <div class="numbertext">3 / 3</div>
              <div class="text">Caption Text</div>
            </Col>
          </Row>
          </Container>
        <Container>
          <div class="prev" onclick="plusSlides(-1)">
            &#10094;
          </div>
          <div class="next" onclick="plusSlides(1)">
            &#10095;
          </div>
          </Container>
        <Container>
          <div>
            <span class="dot" onclick="currentSlide(1)"></span>
            <span class="dot" onclick="currentSlide(2)"></span>
            <span class="dot" onclick="currentSlide(3)"></span>
          </div>
        </Container>
      </div>
      <Footer></Footer>
    </WelcomeFormBlock>
  );
};

export default WelcomebodyForm;
