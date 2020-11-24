import React from 'react';
import AuthTemplate from '../components/Auth/AuthTemplate';
import FindPwForm from '../containers/Auth/FindPwForm';

const FindPwPage = () => {
  return (
    <AuthTemplate>
      <FindPwForm />
    </AuthTemplate>
  );
};

export default FindPwPage;
