import React from "react";
import { Route } from "react-router";
import MainService from "./pages/MainService";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Route path="/" exact component={HomePage} />
      <Route path="/welcome" />
      <Route path="/kkiri" component={MainService} />
    </>
  );
}

export default App;
