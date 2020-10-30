import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./modules";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore(rootReducer);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
