import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AuthForm from '../../components/Auth/AuthForm';
import {
  changeField,
  initializeForm,
  sendEmailAuthenticationCode,
  register,
  initializeAll,
} from '../../modules/auth';
import { check } from '../../modules/member';

const RegisterFormContainer = ({ history }) => {
  const dispatch = useDispatch();
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [emailSendMessage, setEmailSendMessage] = useState('');
  const [authErrorMessage, setAuthErrorMessage] = useState('');

  const { form, emailError, emailSuccess, auth, authError } = useSelector(
    ({ auth }) => ({
      form: auth.register,
      emailError: auth.emailAuthenticationError,
      emailSuccess: auth.emailAuthentication,
      auth: auth.auth,
      authError: auth.authError,
    })
  );
  const { member } = useSelector(({ member }) => ({ member: member.member }));

  const state = useSelector((state) => ({ state }));
  console.log(state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      })
    );
    setAuthErrorMessage('');
    if (name === 'email') {
      setEmailErrorMessage('');
      if (emailSuccess) {
        setEmailErrorMessage('이메일 인증을 다시 받아주세요!');
        setEmailSendMessage('');
        dispatch(initializeAll());
      }
    }
  };

  const handleSendButtonClick = (e) => {
    e.preventDefault();
    console.log('이메일 보내기 누름');
    setEmailSendMessage('');
    setEmailErrorMessage('');
    dispatch(sendEmailAuthenticationCode(form.email));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('회원가입 서브밋 눌럿땅');

    if (emailSuccess) {
      if (
        emailSuccess.emailAuthenticationCode === form.emailAuthenticationCode
      ) {
        dispatch(register(form));
        dispatch(initializeForm('register'));
      } else {
        setAuthErrorMessage('이메일 인증번호가 일치하지 않습니다');
      }
    } else {
      setAuthErrorMessage('이메일이 인증되지 않았습니다');
    }
  };

  useEffect(() => {
    dispatch(initializeForm('register'));

    return () => {
      console.log('나가냐');
      dispatch(initializeAll());
      dispatch(initializeForm('register'));
    };
  }, [dispatch]);

  useEffect(() => {
    if (emailError) {
      if (emailError.response.status === 409) {
        setEmailErrorMessage('사용중인 이메일 입니다.');
      } else if (emailError.response.status === 400) {
        setEmailErrorMessage('이메일을 형식에 맞게 입력하세요.');
      }
    }
    if (emailSuccess) {
      setEmailSendMessage('이메일 인증코드 발송 성공!');
    }
    if (authError) {
      if (authError.response.status === 401) {
        setAuthErrorMessage('이메일 인증번호가 일치하지 않습니다');
      }
    }
  }, [emailError, emailSuccess, authError]);

  useEffect(() => {
    if (auth) {
      console.log('로그인 했을때만');
      console.log(auth);

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
      type="register"
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onSendButtonClick={handleSendButtonClick}
      emailErrorMessage={emailErrorMessage}
      emailSendMessage={emailSendMessage}
      authErrorMessage={authErrorMessage}
    />
  );
};

export default withRouter(RegisterFormContainer);
