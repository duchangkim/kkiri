import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterFromContainer from '../containers/auth/RegisterFormContainer';

const LoginPage_ = () => {
  return (
    <AuthTemplate>
      <RegisterFromContainer />
    </AuthTemplate>
  );
};

export default LoginPage_;
