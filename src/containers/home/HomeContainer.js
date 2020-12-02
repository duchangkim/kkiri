import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import { withRouter } from 'react-router-dom';
import Home from '../../components/Home';
import { check } from '../../modules/member';

function HomeContainer({ history }) {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, member } = useSelector(({ auth, member }) => {
    return {
      form: auth.login,
      auth: auth.auth,
      authError: auth.authError,
      member: member.member,
    };
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    dispatch(
      login({
        email,
        password,
      })
    );
  };

  // 컴포넌트가 처음 렌더링 될때 form 을 초기화
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setError('로그인 실패 :(');
      return;
    }
    if (auth) {
      dispatch(check());
    }
  }, [authError, auth, dispatch]);

  useEffect(() => {
    if (member) {
      history.push('/kkiri/home');

      try {
        localStorage.setItem('member', JSON.stringify(member));
      } catch (e) {}
    }
  }, [member, history]);
  return (
    <Home form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
  );
}

export default withRouter(HomeContainer);
