import React from "react";
import { render, cleanup } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import SupportPage, { supportQuery } from "../pages/Support";
import { gql } from "apollo-boost";
import HomePage, { personalInfoquery } from "../pages/Home";
import Action, { actionQuery } from "../pages/Action";
import SupportPlan from "../pages/SupportPlan";
import App from "../components/App";
import "@testing-library/jest-dom/extend-expect";
import ActionDetail, { actionDetailquery } from "../pages/ActionDetails";
import Header from "../components/header";
import waait from "waait";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

afterEach(cleanup);

const mocks = [
  {
    request: {
      query: supportQuery,
      variables: { email: "abc@gmail.com" },
    },
    result: {
      data: {
        schema_contact: [
          {
            infrm__supportplan__cs: [
              {
                name: "PLAN-xyz",
                recordtype: {
                  name: "hello worl",
                },
                createddate: "2020-03-11",
                user_to_supportplan: {
                  name: "xyz",
                },
              },
            ],
          },
        ],
      },
    },
  },
];

it("renders loading in products", async () => {
  const { getByText, findByText, getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SupportPage email={"abc@gmail.com"} />
    </MockedProvider>
  );
  const element = getByTestId("loading");
  expect(element).toHaveTextContent("Loading");
});

it("renders product when loaded ", async () => {
  const history = createMemoryHistory();
  const { getByText, findByText, getByTestId, debug } = render(
    <Router history={history}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <SupportPage email={"abc@gmail.com"} />
      </MockedProvider>
    </Router>
  );

  await waait(0);

  const element = getByTestId("text-content");
  expect(element).toHaveTextContent("xyz");
});

// it("renders menu button", async () => {
//   const { getByText, findByText, getByTestId } = render(<App />);
//   const element = getByTestId("button");
//   expect(element).toHaveTextContent("Personal");
// });
