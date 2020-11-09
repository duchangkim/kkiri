import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import RegisterCodeForm from "../containers/auth/RegisterCodeForm";

const RegisterCodePage = () => {
  return (
    <AuthTemplate>
      <RegisterCodeForm />
    </AuthTemplate>
  );
};

export default RegisterCodePage;
