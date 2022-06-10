import * as React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import middleware from "../middleware";
import reducer from "../reducers";
import LoginPage from "../components/LoginPage";

const store = createStore(reducer, middleware);

describe("LoginPage", () => {
  it("displays username field, password field, and disabled login button", () => {
    var component = render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );
    var inputUserName = component.getByTestId("username-input");
    var inputPassword = component.getByTestId("password-input");
    var loginButton = component.getByTestId("login-button");
    expect(inputUserName).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled;
  });

  it("displays enabled login button if username and password fields are filled in", () => {
    var component = render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );
    var inputUserName = component.getByTestId("username-input");
    var inputPassword = component.getByTestId("password-input");
    var loginButton = component.getByTestId("login-button");
    fireEvent.change(inputUserName, { target: { value: "sarahedo" } });
    fireEvent.change(inputPassword, { target: { value: "password123" } });
    expect(loginButton).toBeEnabled;
  });

  it("displays error modal if incorrect login", () => {
    var component = render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );
    var inputUserName = component.getByTestId("username-input");
    var inputPassword = component.getByTestId("password-input");
    var loginButton = component.getByTestId("login-button");
    var errorModal = component.getByTestId("error-modal");
    fireEvent.change(inputUserName, { target: { value: "sarahedo" } });
    fireEvent.change(inputPassword, { target: { value: "incorrect" } });
    fireEvent.click(loginButton);
    expect(errorModal).toBeInTheDocument();
  });
});
