import React from 'react';
import { useDispatch } from 'react-redux';
import LogoutForm from '../../components/Auth/LogoutForm';
import { withRouter } from 'react-router-dom';
import { logout } from '../../modules/member';

const LogoutContainer = ({ history }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  return <LogoutForm onLogout={onLogout} />;
};

export default withRouter(LogoutContainer);
