import React from 'react';
import MemberDeleteContainer from '../../containers/setup/MemberDeleteContainer';
import LogoutContainer from '../../containers/auth/LogoutContainer';

import { Container } from 'react-bootstrap';

const SettingPage = () => {
  return (
    <Container>
      <LogoutContainer />
      <MemberDeleteContainer />
    </Container>
  );
};

export default SettingPage;
