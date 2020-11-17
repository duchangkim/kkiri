import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, registeremail } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { withRouter } from "react-router-dom";

const RegisterEmailForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, isSuccess } = useSelector(
    ({ auth, member }) => {
      return {
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        member: member.member,
        isSuccess: auth.registeremail.isSuccess,
        transEmail: auth.register.email,
      };
    }
  );

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "register",
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email } = form;
    const email_check = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    console.log(email);
    if (email === "") {
      setError("빈 칸을 모두 입력하세요.");
      return;
    } else if (!email.match(email_check)) {
      return setError("올바른 이메일 형식을 입력해주세요.");
    }
    dispatch(registeremail(email));
  };

  useEffect(() => {
    dispatch(initializeForm("registeremail"));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError("이미 존재하는 계정명입니다.");
        return;
      }
      setError("이메일을 다시 입력하세요");
      return;
    }
    if (auth) {
      console.log("이메일 전송완료");
    }
  }, [auth, authError, dispatch, error]);

  useEffect(() => {
    if (isSuccess) {
      console.log("이메일 발송 성공");
      alert("이메일을 발송 했습니다.");
      history.push("/registercode");
    }
  }, [history, isSuccess]);

  return (
    <AuthForm
      type="registeremail"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(RegisterEmailForm);
