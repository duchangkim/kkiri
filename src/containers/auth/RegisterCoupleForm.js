import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeField,
  // initializeForm,
  registercouple,
  createCoupleSet,
} from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/member';
import { withRouter } from 'react-router-dom';

const CoupleCodeForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, coupleCodeError, otherMember } = useSelector(
    ({ auth }) => {
      console.log(auth);
      return {
        form: auth.registercouple,
        auth: auth.auth,
        coupleCodeError: auth.registercouple.error,
        otherMember: auth.registercouple.otherMember,
      };
    }
  );
  const { member } = useSelector(({ member }) => member);
  console.dir(member);

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'registercouple',
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { couplecode } = form;
    console.log('casdfasfasdfadsfasdfadsfouplecode');
    console.log(couplecode);
    if (couplecode === '') {
      setError('코드를 입력하세요.');
      return;
    }
    dispatch(registercouple(couplecode));
  };

  useEffect(() => {
    // 유저코드로 찾아온 멤버가 있으면 커플세트 만들어주는 api호출
    if (otherMember) {
      console.log('유저코드로 찾아왔는가?');
      dispatch(createCoupleSet(otherMember._id));
      return;
    }
  }, [otherMember, dispatch]);

  useEffect(() => {
    // 유저코드로 상대방을 찾아오지 못했을 때
    if (coupleCodeError) {
      setError('상대방을 찾을 수 없습니다.');
      return;
    }
  }, [coupleCodeError]);

  useEffect(() => {
    // 커플세트 만들어줬을 때 디비에서 멤버 체크 한번더
    if (auth) {
      dispatch(check());
      return;
    }
  }, [auth, dispatch]);

  useEffect(() => {
    if (member.coupleShareCode) {
      history.push('/kkiri/home');
      return;
    }
  }, [history, member]);

  if (!member.userCode) {
    history.push('/kkiri/home');
  }

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
