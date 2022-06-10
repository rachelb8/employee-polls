import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import reducer from "./reducers";
import middleware from "./middleware";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./index.css";

const store = createStore(reducer, middleware);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
