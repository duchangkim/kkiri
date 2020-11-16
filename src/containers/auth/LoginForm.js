import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeField, initializeForm, login } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { withRouter } from "react-router-dom";
import { check } from "../../modules/member";

const LoginForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, member } = useSelector(({ auth, member }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    member: member.member,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "login",
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    dispatch(initializeForm("login"));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log("오류 발생");
      console.log(authError);
      setError("로그인 실패");
      return;
    }
    if (auth) {
      console.log("로그인 성공");
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (member) {
      try {
        localStorage.setItem("member", JSON.stringify(member));
      } catch (e) {
        console.log("localStorage error");
      }
      if (member.coupleShareCode) {
        history.push("/kkiri/home");
        return;
      } else if (!member.coupleShareCode) {
        history.push("/registercouple");
        return;
      }
    }
  }, [history, member]);
  useEffect(() => {
    dispatch(initializeForm("findid"));
    dispatch(initializeForm("findpw"));
  }, [dispatch]);
  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(LoginForm);
