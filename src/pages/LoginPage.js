import React from 'react';
import AuthTemplate from '../components/Auth/AuthTemplate';
import LoginFromContainer from '../containers/Auth/LoginFormContainer';

const LoginPage_ = () => {
  return (
    <AuthTemplate>
      <LoginFromContainer />
    </AuthTemplate>
  );
};

export default LoginPage_;
