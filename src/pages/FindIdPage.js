import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import FindIdForm from '../containers/auth/FindIdForm';

const FindIdPage = () => {
  return (
    <AuthTemplate>
      <FindIdForm />
    </AuthTemplate>
  );
};

export default FindIdPage;
