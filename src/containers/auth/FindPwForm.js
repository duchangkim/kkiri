import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, findpw } from '../../modules/auth';
import FindForm from '../../components/Auth/FindForm';
import { withRouter } from 'react-router-dom';

const FindPwForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, isSuccess, findEmail } = useSelector(
    ({ auth, member }) => {
      return {
        form: auth.findpw,
        auth: auth.auth,
        authError: auth.authError,
        isSuccess: auth.findpw.isSuccess,
        findEmail: auth.findpw.findEmail,
      };
    }
  );

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'findpw',
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { birthday, email, hp } = form;

    const email_check = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const birthday_check = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    const hp_check = /^\d{2,3}-\d{3,4}-\d{4}$/;

    if ([birthday, email, hp].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    } else if (!email.match(email_check)) {
      return setError('이름을 입력해주세요.');
    } else if (!birthday.match(birthday_check)) {
      return setError('-를 포함한 생년월일을 입력해주세요.');
    } else if (!hp.match(hp_check)) {
      return setError('-를 포함한 전화번호를 입력해주세요.');
    }
    dispatch(findpw({ birthday, email, hp }));
  };

  useEffect(() => {
    dispatch(initializeForm('findpw'));
    dispatch(initializeForm('findid'));
    setError('');
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setError('없는 계정입니다.');
      return;
    }
    if (auth) {
    }
    setError('');
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (findEmail) {
      history.push('/changepassword');
    }
  }, [history, isSuccess, findEmail]);

  return (
    <FindForm
      type="findpw"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      findEmail={findEmail}
    />
  );
};

export default withRouter(FindPwForm);
