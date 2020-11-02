import React from "react";
import styled from "styled-components";

const LoginBlock = styled.div`
  width: 800px;
  height: 400px;
  display: flex;

  margin: auto;
  border: 2px solid #888888;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    width: 100%;
    height: 100%;
  }
`;

const StyledInput = styled.input`
  width: 80%;
  height: 50px;
  margin: auto;
  & + button {
    margin: auto;
  }
`;

const ErrorMsg = styled.div`
  color: red;
`;

function Home({ form, onChange, onSubmit, error }) {
  // console.log(form);
  return (
    <>
      <LoginBlock>
        <form onSubmit={onSubmit}>
          <StyledInput
            autoComplete="email"
            type="text"
            onChange={onChange}
            placeholder="email"
            name="email"
            value={form.email}
          />
          <StyledInput
            type="password"
            onChange={onChange}
            placeholder="password"
            name="password"
            value={form.password}
          />
          <StyledInput
            type="submit"
            className="btn btn-primary"
            value="로그인"
          />
          {error ? <ErrorMsg>{error}</ErrorMsg> : null}
        </form>
      </LoginBlock>
    </>
  );
}

export default Home;
