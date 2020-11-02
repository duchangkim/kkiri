import React from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import NavigationBar from "../../components/common/NavigationBar";
import { logout } from "../../modules/member";

const NavigationBarContainer = ({ windowMatches, history }) => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    history.push("/");
  };

  return <NavigationBar onLogout={onLogout} windowMatches={windowMatches} />;
};

export default withRouter(NavigationBarContainer);
