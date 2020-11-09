import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, registercode } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { check } from "../../modules/member";
import { withRouter } from "react-router-dom";

const RegisterCodeForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, isSuccess } = useSelector(
    ({ auth, member }) => ({
      form: auth.registercode,
      auth: auth.auth,
      authError: auth.authError,
      member: member.member,
      isSuccess: auth.registercode.isSuccess,
    })
  );

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "registercode",
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { emailcode } = form;
    console.log("submit", emailcode);
    const emailcode_check = /[^0-9]/g;
    if (emailcode === "") {
      setError("코드를 입력하세요.");
      return;
    } else if (emailcode.match(emailcode_check)) {
      console.log(emailcode.match);
      setError("숫자만 입력하세요.");
      return;
    }
    dispatch(registercode({ emailcode }));
  };

  useEffect(() => {
    dispatch(initializeForm("registercode"));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError("이미 존재하는 계정명입니다.");
        return;
      }
      console.log(authError);
      setError("코드가 같지 않습니다.");
      return;
    }
    if (auth) {
      console.log("코드인증 성공");
      console.log(auth);
      dispatch(check());
      return this.setState({ change: true });
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      console.log("check API 성공");
      console.log(isSuccess);
      history.push("/register");
    }
  }, [history, isSuccess]);

  useEffect(() => {
    dispatch(initializeForm("registercode"));
  }, [dispatch]);

  return (
    <AuthForm
      type="registercode"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(RegisterCodeForm);
