import React from 'react';
import AuthTemplate from '../components/_Auth/AuthTemplate';
import RegisterFromContainer from '../containers/_Auth/RegisterFormContainer';

const LoginPage_ = () => {
  return (
    <AuthTemplate>
      <RegisterFromContainer />
    </AuthTemplate>
  );
};

export default LoginPage_;
