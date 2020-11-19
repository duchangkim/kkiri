import React from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Button from "../common/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container } from "react-bootstrap";

const SetUpFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const MemberDeleteForm = ({ form, onChange, onSubmit }) => {
  return (
    <SetUpFormBlock>
      <Container>
        <form onSubmit={onSubmit}>
          <ButtonWithMarginTop cyan fullWidth style={{ marginTop: "5rem " }}>
            회원 탈퇴
          </ButtonWithMarginTop>
        </form>
      </Container>
    </SetUpFormBlock>
  );
};

export default MemberDeleteForm;
