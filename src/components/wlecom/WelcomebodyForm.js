import React from "react";
import Slider from "infinite-react-carousel";
import styled from "styled-components";
import img1 from "./images/al2.png";
import img2 from "./images/al3.png";
import img3 from "./images/al4.png";
import "bootstrap/dist/css/bootstrap.min.css";

import { Image } from "react-bootstrap";

const Wel = styled.div`
  background: rgba(255, 131, 141, 1);
`;

const WelcomebodyForm = () => {
  return (
    <Wel>
      <Slider dots>
        <div>
          <Image src={img1} />
        </div>
        <div>
          <Image src={img2} />
        </div>
        <div>
          <Image src={img3} />
        </div>
      </Slider>
    </Wel>
  );
};

export default WelcomebodyForm;
