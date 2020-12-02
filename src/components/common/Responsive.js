import React from "react";
import styled from "styled-components";

import { Container } from "react-bootstrap";
const ResponsiveBlock = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 0 auto;
`;

const Responsive = ({ children, ...rest }) => {
  return (
    <Container>
      <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>
    </Container>
  );
};

export default Responsive;
