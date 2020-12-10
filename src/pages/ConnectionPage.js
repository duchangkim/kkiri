import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import ConnectionContainer from '../containers/auth/ConnectionContainer';

const ConnectionPage = () => {
  return (
    <AuthTemplate>
      <ConnectionContainer />
    </AuthTemplate>
  );
};

export default ConnectionPage;
