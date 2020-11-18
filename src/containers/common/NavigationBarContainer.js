import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavigationBar from '../../components/common/NavigationBar';
import { logout } from '../../modules/member';

const NavigationBarContainer = ({ windowMatches, history }) => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('messages', []);
    } catch (e) {
      console.log('로컬스토리지 에러');
    }

    dispatch(logout());
    history.push('/');
  };

  return <NavigationBar onLogout={onLogout} windowMatches={windowMatches} />;
};

export default withRouter(NavigationBarContainer);
