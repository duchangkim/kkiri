import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, findid } from "../../modules/auth";
import FindForm from "../../components/auth/FindForm";
import { check } from "../../modules/member";
import { withRouter } from "react-router-dom";

const FindIdForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, isSuccess } = useSelector(
    ({ auth, member }) => {
      console.log(auth);
      return {
        form: auth.findid,
        auth: auth.auth,
        authError: auth.authError,
        member: member.member,
        isSuccess: auth.registeremail.isSuccess,
      };
    }
  );

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "findid",
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { birthday, name, hp } = form;

    const name_check = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
    const birthday_check = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    const hp_check = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

    if ([birthday, name, hp].includes("")) {
      setError("빈 칸을 모두 입력하세요.");
      return;
    } else if (!name.match(name_check)) {
      return setError("이름을 입력해주세요.");
    } else if (!birthday.match(birthday_check)) {
      return setError("-를 포함한 생년월일을 입력해주세요.");
    } else if (!hp.match(hp_check)) {
      return setError("-를 포함한 전화번호를 입력해주세요.");
    }
    console.log(birthday, name, hp);
    dispatch(findid({ birthday, name, hp }));
  };

  useEffect(() => {
    dispatch(initializeForm("findid"));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status !== 409) {
        setError("이미 존재하는 계정명입니다.");
        return;
      } else if (authError.response.status === 409) {
        setError("존재하지 않는 계정명입니다.");
        return;
      }
    }
    if (auth) {
      console.log("이메일 전송완료");
      dispatch(check());
    }
  }, [auth, authError, dispatch, error]);

  useEffect(() => {
    if (isSuccess) {
      console.log("이메일 발송 성공");
      alert("이메일을 발송 했습니다.");
      history.push("/findpw");
    }
  }, [history, isSuccess]);

  return (
    <FindForm
      type="findid"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(FindIdForm);
