import React from "react";
import { Route } from "react-router";
import MainService from "./pages/MainService";
import PostListPage from "./pages/PostListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RegisterCodePage from "./pages/RegisterCodePage";
import RegisterEmailPage from "./pages/RegisterEmailPage";
import RegisterCouplePage from "./pages/RegisterCouplePage";
import FindIdPage from "./pages/FindIdPage";
import FindPwPage from "./pages/FindPwPage";
function App() {
  return (
    <>
      <Route component={PostListPage} path={["/@:username", "/"]} exact />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={RegisterCodePage} path="/registercode" />
      <Route component={RegisterEmailPage} path="/registeremail" />
      <Route component={RegisterCouplePage} path="/registercouple" />
      <Route component={FindIdPage} path="/findid" />
      <Route component={FindPwPage} path="/findpw" />
      <Route path="/kkiri" component={MainService} />
    </>
  );
}

export default App;
