import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { check, logout } from "../../modules/member";
import {
  changeField,
  initializeForm,
  findOtherMember,
  createCoupleSet,
  superInitialize,
} from "../../modules/auth";
import Connection from "../../components/Auth/Connection";

const ConnectionContainer = ({ history }) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const { form, otherMember, otherMemberError, auth } = useSelector(
    ({ auth }) => ({
      form: auth.connection,
      otherMember: auth.otherMember,
      otherMemberError: auth.otherMemberError,
      auth: auth.auth,
    })
  );

  const { member } = useSelector(({ member }) => ({ member: member.member }));

  const state = useSelector((state) => ({ state }));
  console.log(state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      changeField({
        form: "connection",
        key: name,
        value,
      })
    );
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(member.userCode)
    // console.log(Number(form.otherUserCode))

    if (member.userCode === Number(form.otherUserCode)) {
      // console.log('혼자서는 연애할 수 없다')
      setErrorMessage("본인 고유번호는 입력하실 수 없습니다");
    } else {
      dispatch(findOtherMember(form.otherUserCode));
    }
  };

  const onLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  useEffect(() => {
    dispatch(check());
    dispatch(initializeForm("connection"));

    return () => {
      dispatch(initializeForm("connection"));
      setErrorMessage("");
    };
  }, [dispatch]);

  useEffect(() => {
    if (otherMemberError) {
      if (otherMemberError.response.status === 401) {
        setErrorMessage("상대방을 찾을 수 없습니다.");
      }
    }

    if (otherMember) {
      // console.log("커플연결 진행시켜");
      const { _id } = otherMember;
      dispatch(createCoupleSet(_id));
    }
  }, [otherMemberError, otherMember, dispatch]);

  useEffect(() => {
    if (auth) {
      if (auth.coupleShareCode) {
        // console.log("연결 성공일세");
        dispatch(check());
        history.push("/kkiri/home");
        dispatch(superInitialize());
      }
    }
  }, [auth, history, dispatch]);

  if (!member) {
    history.push("/");
    return <h3>잉</h3>;
  }

  if (member) {
    if (member.userCode === null || !member.userCode) {
      history.push("/kkiri/home");
    }
  }

  return (
    <Connection
      member={member}
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
      onLogout={onLogout}
    />
  );
};

export default withRouter(ConnectionContainer);
