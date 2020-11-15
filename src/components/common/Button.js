import React from "react";
import styled, { css } from "styled-components";
import palette from "../../lib/styles/palette";
import { Link } from "react-router-dom";

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: #f58cb4;
  &:hover {
    background: #f58cb49d;
    color: #fff;
  }
  &:focus {
    outline: none;
    border: 2px dotted #f58cb4;
    border-radius: 4px;
  }

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
      font-size: 1.125rem;
    `}

  ${(props) =>
    props.cyan &&
    css`
      background: #f58cb4;
      padding: 0.5rem 0;
      &:hover {
        background: #f58cb49d;
      }
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = (props) => {
  return props.to ? (
    <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
