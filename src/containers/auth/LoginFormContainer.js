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

  const state = useSelector((state) => ({ state }));
  console.log(state);

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
    console.log('로그인 서브밋 눌럿땅');
    console.log(form);
    dispatch(login(form));
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.data.error === 'not found email') {
        console.log('존재 ㄴ이메일');
        setAuthErrorMessage('존재하지 않는 이메일 입니다');
      } else {
        console.log('비번 병신');
        setAuthErrorMessage('비밀번호가 일치하지 않습니다');
        return;
      }
    }
  }, [authError]);

  useEffect(() => {
    if (auth) {
      console.log('로그인 했을때만');
      console.log(auth);

      dispatch(initializeForm('login'));
      dispatch(check());
    }
  }, [dispatch, auth]);

  useEffect(() => {
    if (member) {
      try {
        localStorage.setItem('member', JSON.stringify(member));
      } catch (e) {
        console.log(e);
        console.log('localStorage error!!!!!!!!!!!');
      }
      if (member.coupleShareCode) {
        history.push('/kkiri/home');
        console.log('로그인 했고 커플인경우');
      } else if (!member.coupleShareCode || member.coupleId) {
        history.push('/connection');
        console.log('로그인 했지만 커플이 아닌경우');
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
