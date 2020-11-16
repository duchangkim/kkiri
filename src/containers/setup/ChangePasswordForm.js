import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, changepassword } from '../../modules/setUp';
import PasswordForm from '../../components/setup/PasswordForm';
import { check } from '../../modules/member';
import { withRouter } from 'react-router-dom';

const ChangePasswordForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, setup, authError, member,findEmail } = useSelector(
    ({ setup, member,auth }) => {
      return {
        form: setup.changepassword,
        setup: setup.setup,
        authError: setup.authError,
        member: member.member,
        findEmail: auth.findpw.findEmail,
      };
    }
  );

  console.log("findEmailfindEmail"+findEmail);
  
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'changepassword',
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { password, passwordConfirm } = form;
    const email1 = findEmail;
    console.log('여기 폼뷰뷴');
    console.log(email1);
    console.log(form);
    const password_check = /^[A-Za-z0-9]{6,12}$/;

    if ([password, passwordConfirm].includes("")) {
      setError('빈 칸을 모두 입력하세요.');
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
    }
    dispatch(changepassword({password, findEmail}));
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
    if (setup) {
      console.log("성공");
      console.log(setup);
      dispatch(check());
      return;
    }
  }, [setup, authError, dispatch, error]);

  useEffect(() => {
    if (member) {
      console.log(`check API success`);
      console.log(member);
      history.push("/");
      try {
        localStorage.getItem("member", JSON.stringify(member));
      } catch (e) {
        console.log("localStorage error");
      }
    }
  }, [member, history]);

  useEffect(() => {
    dispatch(initializeForm('changepassword'));
    dispatch(initializeForm("findpw"));
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
