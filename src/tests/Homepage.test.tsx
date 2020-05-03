import React from "react";
import { render, cleanup } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import HomePage, { personalInfoquery } from "../pages/Home";
import "@testing-library/jest-dom/extend-expect";
import waait from "waait";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

afterEach(cleanup);

const mocks = [
  {
    request: {
      query: personalInfoquery,
      variables: { email: "abc@gmail.com" },
    },
    result: {
      data: {
        schema_contact: [
          {
            name: "xyz",
            birthdate: "2000-10",
            client_id__c: "9628",
            infrm__referral_date__c: "2019-12",
            email: "abc@gmail.com",
          },
        ],
      },
    },
  },
];

const err_mocks = [
  {
    request: {
      query: personalInfoquery,
      variables: { email: "abc@gmail.com" },
    },
    result: {
      data: null,
    },
  },
];

it("renders homepage", async () => {
  const { getByText, findByText, getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <HomePage email={"abc@gmail.com"} />
    </MockedProvider>
  );
  const element = getByTestId("loading");
  expect(element).toHaveTextContent("Loading");
});

// it("renders Homepage when loaded ", async () => {
//   const history = createMemoryHistory();
//   const { getByText, findByText, getByTestId, debug } = render(
//     <Router history={history}>
//       <MockedProvider mocks={err_mocks} addTypename={false}>
//         <HomePage email={"abc@gmail.com"} />
//       </MockedProvider>
//     </Router>
//   );

//   await waait(0);

//   const element = getByTestId("text-content");
//   expect(element).toHaveTextContent("xyz");
// });
