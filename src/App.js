import React from 'react';
import { Route } from 'react-router';
import MainService from './pages/MainService';
import WelcomPage from './pages/WelcomPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegisterCouplePage from './pages/RegisterCouplePage';
import FindIdPage from './pages/FindIdPage';
import FindPwPage from './pages/FindPwPage';
import FindResultPage from './pages/FindResultPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import LoginPage_ from './pages/LoginPage_';
import RegisterPage_ from './pages/RegisterPage_';

const Temp = () => {
  return <h1>시발 솔로 꺼져</h1>;
};

function App() {
  return (
    <>
      <Route component={WelcomPage} path={['/@:username', '/']} exact />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={FindIdPage} path="/findid" />
      <Route component={FindPwPage} path="/findpw" />
      <Route component={RegisterCouplePage} path="/registercouple" />
      <Route component={FindResultPage} path="/findresult" />
      <Route component={ChangePasswordPage} path="/changepassword" />
      <Route component={MainService} path="/kkiri" />
      <Route component={LoginPage_} path="/login_" />
      <Route component={RegisterPage_} path="/register_" />
      <Route component={Temp} path="/connection" />
    </>
  );
}

export default App;
