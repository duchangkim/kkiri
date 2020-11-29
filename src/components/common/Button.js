import React from "react";
import styled, { css } from "styled-components";
import palette from "../../lib/styles/palette";
import { Link } from "react-router-dom";

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-weight: bold;
  color: white;
  outline: none;
  cursor: pointer;
  font-size: 1.15rem;
  font-weight: bold;
  padding: 0.25rem 1rem;

  &:hover {
    color: #000;
  }
  &:focus {
    outline: none;
    border: 2px dotted rgba(255, 131, 141, 1);
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
      background: rgba(255, 131, 141, 1);
      padding: 0.475rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      font-weight: 400;
      &:hover {
        background: rgb(255 131 141 / 42%);
        color: #fff;
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
