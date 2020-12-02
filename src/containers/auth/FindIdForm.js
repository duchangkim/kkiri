import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, findid } from '../../modules/auth';
import FindForm from '../../components/Auth/FindForm';
import { withRouter } from 'react-router-dom';

const FindIdForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, authError, findEmail } = useSelector(({ auth, member }) => {
    return {
      form: auth.findid,
      auth: auth.auth,
      authError: auth.authError,
      findEmail: auth.findid.findEmail,
    };
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'findid',
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
    const hp_check = /^\d{2,3}-\d{3,4}-\d{4}$/;

    if ([birthday, name, hp].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    } else if (!name.match(name_check)) {
      return setError('이름을 입력해주세요.');
    } else if (!birthday.match(birthday_check)) {
      return setError('-를 포함한 생년월일을 입력해주세요.');
    } else if (!hp.match(hp_check)) {
      return setError('-를 포함한 전화번호를 입력해주세요.');
    }
    dispatch(findid({ birthday, name, hp }));
  };

  useEffect(() => {
    dispatch(initializeForm('findid'));
    setError('');
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setError('없는 계정입니다.');
      return;
    }
    if (findEmail) {
      history.push(`/findresult`);
    }
    setError('');
  }, [authError, dispatch, findEmail, history]);

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
