import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeField,
  initializeForm,
  registercouple,
  createCoupleSet,
} from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { check } from "../../modules/member";
import { withRouter } from "react-router-dom";

const CoupleCodeForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, otherMember, isSuccess, member } = useSelector(
    ({ auth, member }) => ({
      form: auth.registercouple,
      auth: auth.auth,
      authError: auth.authError,
      member: member.member,
      otherMember: auth.registercouple.otherMember,
      isSuccess: auth.registercouple.isSuccess,
    })
  );

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "registercouple",
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { couplecode } = form;
    if ([couplecode].includes("")) {
      setError("빈 칸을 모두 입력하세요.");
      return;
    }
    dispatch(registercouple(couplecode));
  };

  useEffect(() => {
    dispatch(initializeForm("registercouple"));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError("이미 존재하는 계정입니다.");
        return;
      }
      setError("커플 인증 실패");
      return;
    }
    if (auth) {
      console.log("커플 인증 성공");
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    console.log(otherMember);
    if (otherMember) {
      console.log(otherMember._id);
      dispatch(createCoupleSet(otherMember._id));
    }
  }, [dispatch, otherMember]);

  useEffect(() => {
    if (member.coupleShareCode) {
      history.push("/kkiri/home");
      return;
    }
  }, [history, member]);

  return (
    <AuthForm
      type="registercouple"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      myCode={member.userCode}
    />
  );
};

export default withRouter(CoupleCodeForm);
