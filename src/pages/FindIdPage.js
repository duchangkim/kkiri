import React from 'react';
import AuthTemplate from '../components/Auth/AuthTemplate';
import FindIdForm from '../containers/Auth/FindIdForm';

const FindIdPage = () => {
  return (
    <AuthTemplate>
      <FindIdForm />
    </AuthTemplate>
  );
};

export default FindIdPage;
