import React from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import Action, { actionQuery } from "../pages/Action";
import "@testing-library/jest-dom/extend-expect";
import waait from "waait";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const mocks = [
  {
    request: {
      query: actionQuery,
      variables: { email: "abc@gmail.com" },
    },
    result: {
      data: {
        schema_contact: [
          {
            infrm__action__cs: [
              {
                name: "hello world",
                recordtype: {
                  name: "abcd",
                },
                createddate: "2019-12",
                counsellor__c: "abc xyz",
              },
            ],
          },
        ],
      },
    },
  },
];

it("renders loading states in action", async () => {
  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Action email={"abc@gmail.com"} />
    </MockedProvider>
  );
  const element = getByTestId("loading");
  expect(element).toHaveTextContent("Loading");
});

it("renders action when loaded", async () => {
  const history = createMemoryHistory();
  const { getByTestId } = render(
    <Router history={history}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Action email={"abc@gmail.com"} />
      </MockedProvider>
    </Router>
  );

  await waait(0);

  const element = getByTestId("text-content");
  expect(element).toHaveTextContent("abcd");
});
