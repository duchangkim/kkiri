import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { check } from '../../modules/member';
import AuthForm from '../../components/_Auth/AuthForm';
import { changeField, initalizeFrom, login } from '../../modules/_auth';

const LoginFromContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { form, auth } = useSelector(({ _auth }) => ({
    form: _auth.login,
    auth: _auth.auth,
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('로그인 서브밋 눌럿땅');
    console.log(form);
    dispatch(login(form));
    dispatch(initalizeFrom('login'));
  };

  useEffect(() => {
    dispatch(initalizeFrom('login'));
  }, [dispatch]);

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
      type="login"
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default withRouter(LoginFromContainer);
