import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { check } from '../../modules/member';
import AuthForm from '../../components/Auth/AuthForm';
import { changeField, initializeForm, login } from '../../modules/auth';

const LoginFromContainer = ({ history }) => {
  const dispatch = useDispatch();
  const [authErrorMessage, setAuthErrorMessage] = useState();
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
  }));
  const { member } = useSelector(({ member }) => ({ member: member.member }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      })
    );
    setAuthErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.data.error === 'not found email') {
        setAuthErrorMessage('존재하지 않는 이메일 입니다');
      } else {
        setAuthErrorMessage('비밀번호가 일치하지 않습니다');
        return;
      }
    }
  }, [authError]);

  useEffect(() => {
    if (auth) {
      dispatch(initializeForm('login'));
      dispatch(check());
    }
  }, [dispatch, auth]);

  useEffect(() => {
    if (member) {
      try {
        localStorage.setItem('member', JSON.stringify(member));
      } catch (e) {}
      if (member.coupleShareCode) {
        history.push('/kkiri/home');
      } else if (!member.coupleShareCode || member.coupleId) {
        history.push('/connection');
      }
    }
  }, [dispatch, member, history]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      authErrorMessage={authErrorMessage}
    />
  );
};

export default withRouter(LoginFromContainer);
