import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import FindResultForm from '../containers/auth/FindResultForm';

const FindResultPage = () => {
  return (
    <AuthTemplate>
      <FindResultForm />
    </AuthTemplate>
  );
};

export default FindResultPage;
