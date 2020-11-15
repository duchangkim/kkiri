import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, register } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { check } from "../../modules/member";
import { withRouter } from "react-router-dom";

const RegisterForm = ({ history }) => {
  const getEmail = useRef();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, member } = useSelector(({ auth, member }) => {
    getEmail.current = auth.registeremail.email;
    return {
      form: auth.register,
      auth: auth.auth,
      authError: auth.authError,
      member: member.member,
    };
  });

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
    const { email, password, passwordConfirm, birthday, name, hp } = form;

    const password_check = /^[A-Za-z0-9]{6,12}$/;
    const name_check = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
    const birthday_check = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    const hp_check = /^\d{2,3}-\d{3,4}-\d{4}$/;

    if ([email, password, passwordConfirm, birthday, name, hp].includes("")) {
      setError("빈 칸을 모두 입력하세요.");
      return;
    }
    if (!password.match(password_check)) {
      return setError("숫자와 문자 포함 6~12자리을 입력해주세요.");
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
    console.log(email, password, birthday, name, hp);
    dispatch(register({ email, password, birthday, name, hp }));
  };

  useEffect(() => {
    dispatch(
      changeField({
        form: "register",
        key: "email",
        value: getEmail.current,
      })
    );
    return;
  }, [dispatch, getEmail]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError("이미 존재하는 계정명입니다.");
        return;
      }
      console.log("!!!!!!!!!!!!!!!!!!!!!");
      console.log(authError);
      setError("회원가입 실패");
      return;
    }
    if (auth) {
      console.log("회원가입 성공");
      console.log(auth);
      dispatch(check());
      dispatch(initializeForm("registeremail"));
      dispatch(initializeForm("registercode"));
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (member) {
      console.log("check API 성공");
      console.log(member);
      history.push("/registercouple");
      try {
        localStorage.setItem("member", JSON.stringify(member));
      } catch (e) {
        console.log("localStorage error");
      }
    }
  }, [history, member]);
  console.log("여기가 레지스터폼");
  console.log(form);

  useEffect(() => {
    dispatch(initializeForm("registercode"));
    dispatch(initializeForm("registeremail"));
  }, [dispatch]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(RegisterForm);
