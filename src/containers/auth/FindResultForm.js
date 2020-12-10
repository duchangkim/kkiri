import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm } from '../../modules/auth';
import FindForm from '../../components/auth/FindForm';
import { withRouter } from 'react-router-dom';

const FindResultForm = ({ history }) => {
  let myEmail = '';
  const { findEmail } = useSelector(({ auth }) => {
    return {
      findEmail: auth.findid.findEmail,
    };
  });
  myEmail = findEmail + '';
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'findresult',
        key: name,
        value,
      })
    );
  };

  useEffect(() => {
    setError('');
    dispatch(initializeForm('findresult'));
  }, [dispatch]);

  return (
    <FindForm
      type="findresult"
      onChange={onChange}
      error={error}
      myEmail={myEmail}
    />
  );
};

export default withRouter(FindResultForm);
