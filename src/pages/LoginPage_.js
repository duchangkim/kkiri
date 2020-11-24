import React from 'react';
import AuthTemplate from '../components/_Auth/AuthTemplate';
import LoginFromContainer from '../containers/_Auth/LoginFormContainer';

const LoginPage_ = () => {
  return (
    <AuthTemplate>
      <LoginFromContainer />
    </AuthTemplate>
  );
};

export default LoginPage_;
