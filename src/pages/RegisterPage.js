import React from 'react';
import AuthTemplate from '../components/Auth/AuthTemplate';
import RegisterFromContainer from '../containers/Auth/RegisterFormContainer';

const LoginPage_ = () => {
  return (
    <AuthTemplate>
      <RegisterFromContainer />
    </AuthTemplate>
  );
};

export default LoginPage_;
