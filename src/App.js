import React from "react";
import { Route } from "react-router";
import MainService from "./pages/MainService";

function App() {
  return (
    <>
      <Route path="/welcome" />
      <Route path="/kkiri" component={MainService} />
    </>
  );
}

export default App;
