import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeField,
  initializeForm,
  changepassword,
} from "../../modules/setUp";
import PasswordForm from "../../components/setup/PasswordForm";
import { withRouter } from "react-router-dom";

const ChangePasswordForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, setup, authError, findEmail, isSuccess } = useSelector(
    ({ setup, member, auth }) => {
      return {
        form: setup.changepassword,
        setup: setup.setup,
        authError: setup.authError,
        findEmail: auth.findpw.findEmail,
        isSuccess: setup.changepassword.isSuccess,
      };
    }
  );

  console.log("findEmailfindEmail" + findEmail);

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "changepassword",
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { password, passwordConfirm } = form;
    const email1 = findEmail;
    console.log("여기 폼뷰뷴");
    console.log(email1);
    console.log(form);
    const password_check = /^[A-Za-z0-9]{6,12}$/;

    if ([password, passwordConfirm].includes("")) {
      setError("빈 칸을 모두 입력하세요.");
      return;
    }
    if (!password.match(password_check)) {
      return setError("비밀번호 6~12자리을 입력해주세요.");
    } else if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      dispatch(changeField({ form: "register", key: "password", value: "" }));
      dispatch(
        changeField({ form: "register", key: "passwordConfirm", value: "" })
      );
      return;
    }
    dispatch(changepassword({ password, findEmail }));
  };

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError("이미 존재하는 계정명입니다.");
        return;
      }
      console.log(`error!`);
      console.log(authError);
      // setError("회원가입 실패");
      return;
    }
  }, [setup, authError, dispatch, error]);

  useEffect(() => {
    if (isSuccess) {
      console.log(`success`);
      console.log(isSuccess);
      history.push("/");
    }
  }, [isSuccess, history]);

  useEffect(() => {
    dispatch(initializeForm("changepassword"));
  }, [dispatch]);

  return (
    <PasswordForm
      type="changepassword"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      findEmail={findEmail}
    />
  );
};

export default withRouter(ChangePasswordForm);
