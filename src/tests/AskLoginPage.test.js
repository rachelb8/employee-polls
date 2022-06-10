import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import middleware from "../middleware";
import reducer from "../reducers";
import AskLoginPage from "../components/AskLoginPage";

const store = createStore(reducer, middleware);

describe("AskLoginPage", () => {
  it("matches the snapshot", () => {
    var component = render(
      <Provider store={store}>
        <Router>
          <AskLoginPage />
        </Router>
      </Provider>
    );

    var loginButton = component.getByTestId("login-button");
    fireEvent.click(loginButton);
    expect(component).toMatchSnapshot();
  });

  it("ensures login button is displayed and enabled", () => {
    var component = render(
      <Provider store={store}>
        <Router>
          <AskLoginPage />
        </Router>
      </Provider>
    );

    var loginButton = component.getByTestId("login-button");
    fireEvent.click(loginButton);
    expect(loginButton).toBeInTheDocument;
    expect(loginButton).toBeEnabled;
  });
});
