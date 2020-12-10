import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import ChangePasswordForm from '../containers/setup/ChangePasswordForm';

const ChangePasswordPage = () => {
  return (
    <AuthTemplate>
      <ChangePasswordForm />
    </AuthTemplate>
  );
};

export default ChangePasswordPage;
