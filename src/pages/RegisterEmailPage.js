import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import RegisterEmailForm from "../containers/auth/RegisterEmailForm";

const RegisterEmailPage = () => {
  return (
    <AuthTemplate>
      <RegisterEmailForm />
    </AuthTemplate>
  );
};

export default RegisterEmailPage;
