import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import NavigationBar from "../pages/NavigationBar";

it("button redered in side navigation bar ", async () => {
  const history = createMemoryHistory();
  const { getByTestId } = render(
    <Router history={history}>
      <NavigationBar />
    </Router>
  );

  const element = getByTestId("personalInfo");
  expect(element).toHaveTextContent("Personal Info");

  const Support_Plan = getByTestId("Support_Plan");
  expect(Support_Plan).toHaveTextContent("Support Plan");

  const Action_Plan = getByTestId("Action_Plan");
  expect(Action_Plan).toHaveTextContent("Action Plan");
});
