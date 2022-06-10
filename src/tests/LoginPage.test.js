import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import middleware from "../middleware";
import reducer from "../reducers";
import LoginPage from "../components/LoginPage";

const store = createStore(reducer, middleware);

describe("LoginPage", () => {
  let component;
  let inputUserName;
  let inputPassword;
  let loginButton;
  let errorModal;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    inputUserName= component.getByTestId("username-input");
    inputPassword = component.getByTestId("password-input");
    loginButton = component.getByTestId("login-button");
    errorModal =  component.getByTestId("error-modal");
  })

  it("displays username field, password field, and disabled login button", () => {
    expect(inputUserName).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });

  it("displays enabled login button if username and password fields are filled in", () => {
    fireEvent.change(inputUserName, { target: { value: "sarahedo" } });
    fireEvent.change(inputPassword, { target: { value: "password123" } });
    expect(loginButton).toBeEnabled();
  });

  it("displays disabled login button if username and password fields are not filled in", () => {
    fireEvent.change(inputUserName, { target: { value: "" } });
    fireEvent.change(inputPassword, { target: { value: "" } });
    expect(loginButton).toBeDisabled();
  });

  it("displays error modal if incorrect login", () => {
    fireEvent.change(inputUserName, { target: { value: "sarahedo" } });
    fireEvent.change(inputPassword, { target: { value: "incorrect" } });
    fireEvent.click(loginButton);
    expect(errorModal).toBeInTheDocument();
  });
});
