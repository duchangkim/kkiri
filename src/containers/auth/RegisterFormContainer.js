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
import LoadingPage from '../../pages/LoadingPage';

const RegisterFormContainer = ({ history }) => {
  const dispatch = useDispatch();
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [emailSendMessage, setEmailSendMessage] = useState('');
  const [authErrorMessage, setAuthErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
    const { email } = form;
    const email_check = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!email.match(email_check)) {
      return setEmailErrorMessage('올바른 이메일 형식을 입력해주세요.');
    } else {
      e.preventDefault();
      setEmailSendMessage('');
      setEmailErrorMessage('');
    }
    dispatch(sendEmailAuthenticationCode(form.email));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, passwordConfirm, name, hp } = form;

    const password_check = /^[A-Za-z0-9]{6,12}$/;
    const name_check = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
    const hp_check = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;

    if (!password.match(password_check)) {
      return setAuthErrorMessage('비밀번호 6~12자리을 입력해주세요.');
    } else if (password !== passwordConfirm) {
      setAuthErrorMessage('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' })
      );
      return;
    } else if (!name.match(name_check)) {
      return setAuthErrorMessage('이름을 입력해주세요.');
    } else if (!hp.match(hp_check)) {
      return setAuthErrorMessage('전화번호를 입력해주세요.');
    }
    if (emailSuccess.emailAuthenticationCode === form.emailAuthenticationCode) {
      dispatch(register(form));
      dispatch(initializeForm('register'));
      setLoading(true);
    } else {
      setAuthErrorMessage('이메일 인증번호가 일치하지 않습니다');
    }
  };

  useEffect(() => {
    dispatch(initializeForm('register'));

    return () => {
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
      dispatch(check());
    }
  }, [dispatch, auth]);

  useEffect(() => {
    if (member) {
      setLoading(false);
      try {
        localStorage.setItem('member', JSON.stringify(member));
      } catch (e) {
        console.log('localStorage error!!!!!!!!!!!');
      }
      if (member.coupleShareCode) {
        history.push('/kkiri/home');
      } else if (!member.coupleShareCode || member.coupleId) {
        history.push('/connection');
      }
    }
  }, [dispatch, member, history]);

  return loading ? (
    <LoadingPage />
  ) : (
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
