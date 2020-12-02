import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/member';

const HeaderContainer = () => {
  const { member } = useSelector(({ member }) => {
    return { member: member.member };
  });
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };

  return <Header member={member} onLogout={onLogout} />;
};

export default HeaderContainer;
