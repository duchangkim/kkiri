import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import RegisterCoupleForm from "../containers/auth/RegisterCoupleForm";

const RegisterCouplePage = () => {
  return (
    <AuthTemplate>
      <RegisterCoupleForm />
    </AuthTemplate>
  );
};

export default RegisterCouplePage;
