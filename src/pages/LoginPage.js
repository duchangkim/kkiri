import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginFromContainer from '../containers/auth/LoginFormContainer';

const LoginPage_ = () => {
  return (
    <AuthTemplate>
      <LoginFromContainer />
    </AuthTemplate>
  );
};

export default LoginPage_;
