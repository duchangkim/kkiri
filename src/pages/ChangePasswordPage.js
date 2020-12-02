import React from "react";
import AuthTemplate from "../components/Auth/AuthTemplate";
import ChangePasswordForm from "../containers/setup/ChangePasswordForm";

const ChangePasswordPage = () => {
  return (
    <AuthTemplate>
      <ChangePasswordForm />
    </AuthTemplate>
  );
};

export default ChangePasswordPage;
