import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeField,
  initializeForm,
  register,
  registeremail,
} from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { withRouter } from "react-router-dom";
import { check } from "../../modules/member";

const RegisterForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, authError, emailError, member, isSuccess } = useSelector(
    ({ auth, member }) => {
      return {
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        emailError: auth.emailError,
        member: member.member,
        isSuccess: auth.register.isSuccess,
        mailSuccess: auth.registeremail.mailSuccess,
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
  const sendEmail = () => {
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

  const onSubmit = (e) => {
    e.preventDefault();
    const {
      email,
      emailcode,
      password,
      passwordConfirm,
      birthday,
      name,
      hp,
    } = form;

    const emailcode_check = /[^0-9]/g;
    const password_check = /^[A-Za-z0-9]{6,12}$/;
    const name_check = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
    const birthday_check = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    const hp_check = /^\d{2,3}-\d{3,4}-\d{4}$/;

    if (
      [
        email,
        emailcode,
        password,
        passwordConfirm,
        birthday,
        name,
        hp,
      ].includes("")
    ) {
      setError("빈 칸을 모두 입력하세요.");
      return;
    } else if (emailcode.match(emailcode_check)) {
      console.log(emailcode.match);
      setError("이메일 코드가 일치하지 않습니다.");
      return;
    } else if (!password.match(password_check)) {
      return setError("비밀번호 6~12자리을 입력해주세요.");
    } else if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      dispatch(changeField({ form: "register", key: "password", value: "" }));
      dispatch(
        changeField({ form: "register", key: "passwordConfirm", value: "" })
      );
      return;
    } else if (!name.match(name_check)) {
      return setError("이름을 입력해주세요.");
    } else if (!birthday.match(birthday_check)) {
      return setError("-를 포함한 생년월일을 입력해주세요.");
    } else if (!hp.match(hp_check)) {
      return setError("-를 포함한 전화번호를 입력해주세요.");
    }
    console.log(email, emailcode, password, birthday, name, hp);
    dispatch(register({ email, emailcode, password, birthday, name, hp }));
  };

  useEffect(() => {
    if (authError) {
      setError("이메일 코드를 확인해주세요");
      return;
    }
    setError("");
    return;
  }, [authError]);

  useEffect(() => {
    if (emailError) {
      if (emailError.response.status === 409) {
        setError("이미 존재하는 계정명입니다.");
        return;
      }
      setError(`*이메일 코드 전송 완료* 이메일을 확인하세요!`);
      return;
    }
    setError("");
    return;
  }, [emailError]);

  useEffect(() => {
    if (isSuccess) {
      console.log("check API 성공");
      console.log(isSuccess);
      history.push("/registercouple");
      dispatch(check());
      try {
        localStorage.setItem("member", JSON.stringify(member));
      } catch (e) {
        console.log("localStorage error");
      }
    }
    setError("");
  }, [history,dispatch, isSuccess, member]);

  console.log("여기가 레지스터폼");
  console.log(form);

  useEffect(() => {
    dispatch(initializeForm("register"));
    dispatch(initializeForm("registercouple"));
  }, [dispatch]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      sendEmail={sendEmail}
      error={error}
    />
  );
};

export default withRouter(RegisterForm);
