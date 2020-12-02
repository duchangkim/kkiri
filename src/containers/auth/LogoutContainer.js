import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoutForm from "../../components/Auth/LogoutForm";
import { withRouter } from "react-router-dom";
import { logout } from "../../modules/member";

const LogoutContainer = ({ history }) => {
  const dispatch = useDispatch();
  // const { form } = useSelector(({ auth, member }) => {
  //   console.log(member);
  //   return {
  //     form: auth.registercouple,
  //   };
  // });

  const onLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  return <LogoutForm onLogout={onLogout} />;
};

export default withRouter(LogoutContainer);
