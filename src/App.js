import React from "react";
import { Route } from "react-router";
import MainService from "./pages/MainService";
import WelcomPage from "./pages/WelcomPage";
import FindIdPage from "./pages/FindIdPage";
import FindPwPage from "./pages/FindPwPage";
import FindResultPage from "./pages/FindResultPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ConnectionPage from "./pages/ConnectionPage";

function App() {
  return (
    <>
      <Route component={WelcomPage} path={["/@:username", "/"]} exact />
      <Route component={FindIdPage} path="/findid" />
      <Route component={FindPwPage} path="/findpw" />
      <Route component={FindResultPage} path="/findresult" />
      <Route component={ChangePasswordPage} path="/changepassword" />
      <Route component={MainService} path="/kkiri" />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={ConnectionPage} path="/connection" />
    </>
  );
}

export default App;
