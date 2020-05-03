import React from "react";
import { render, cleanup } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import "@testing-library/jest-dom/extend-expect";
import ActionDetail, { actionDetailquery } from "../pages/ActionDetails";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import HomePage, { personalInfoquery } from "../pages/Home";
import waait from "waait";

afterEach(cleanup);

const mocks = [
  {
    request: {
      query: actionDetailquery,
      variables: { actionId: "a-1234" },
    },
    result: {
      data: {
        schema_infrm__action__c: [
          {
            complexity_factors__c: "null",
            contextual_problems__c: "null",
            core_score_stage__c: "Assessment",
            core_score__c: "null",
            goal_progress__c: "2",
          },
        ],
      },
    },
  },
];

it("renders loading in  actionDetail", async () => {
  // const path = "/action/:actionId";
  const route = "/action/a-1234";
  const history = createMemoryHistory({ initialEntries: [route] });
  const { getByText, findByText, getByTestId } = render(
    <Router history={history}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Route path="/action/:actionId">
          <ActionDetail />
        </Route>
      </MockedProvider>
    </Router>
  );
  const element = getByTestId("loading");
  expect(element).toHaveTextContent("Loading");
});

it("renders ActionDetail when loaded ", async () => {
  const route = "/action/a-1234";
  const history = createMemoryHistory({ initialEntries: [route] });
  const { getByText, findByText, getByTestId } = render(
    <Router history={history}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Route path="/action/:actionId">
          <ActionDetail />
        </Route>
      </MockedProvider>
    </Router>
  );

  await waait(0);

  const element = getByTestId("text-content");
  expect(element).toHaveTextContent("2");
});
