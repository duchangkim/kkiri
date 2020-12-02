import React from 'react';
import AuthTemplate from '../components/Auth/AuthTemplate';
import ConnectionContainer from '../containers/Auth/ConnectionContainer';

const ConnectionPage = () => {
  return (
    <AuthTemplate>
      <ConnectionContainer />
    </AuthTemplate>
  );
};

export default ConnectionPage;
