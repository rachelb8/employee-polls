import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import middleware from "../middleware";
import reducer from "../reducers";
import NewPoll from "../components/NewPoll";

const store = createStore(reducer, middleware);

describe("NewPoll", () => {
  let component;
  let inputOptionOne;
  let inputOptionTwo;
  let submitButton;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <Router>
          <NewPoll />
        </Router>
      </Provider>
    );

    inputOptionOne = component.getByTestId("option-one-input");
    inputOptionTwo = component.getByTestId("option-two-input");
    submitButton = component.getByTestId("submit-button");
  })

  it("matches the snapshot", () => {
    expect(component).toMatchSnapshot();
  });

  it("will enable the submit button when submitting a new poll with both options", async () => {
    fireEvent.change(inputOptionOne, { target: { value: "option one test" } });
    fireEvent.change(inputOptionTwo, { target: { value: "option two test" } });

    expect(submitButton).toBeEnabled();
  });

  it('will disable the submit button when submitting a new poll without both options', () => {
    fireEvent.change(inputOptionOne, { target: { value: "option one test" } });
    fireEvent.change(inputOptionTwo, { target: { value: "" } });

    expect(submitButton).toBeDisabled();
  });
});
