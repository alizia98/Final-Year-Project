import React from "react";
import { render, cleanup } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import SupportPage, { supportQuery } from "./pages/Support";
import { gql } from "apollo-boost";
import HomePage, { personalInfoquery } from "./pages/Home";
import Action, { actionQuery } from "./pages/Action";
// import "jest-dom/extend-expect";
import SupportPlan from "./pages/SupportPlan";
import App from "./components/App";
import "@testing-library/jest-dom/extend-expect";
import ActionDetail, { actionDetailquery } from "./pages/ActionDetails";
import Header from "./components/header";

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

const mock_personalInfo = [
  {
    request: {
      query: personalInfoquery,
      variables: { email: "abc@gmail.com" },
    },
    result: {
      data: {
        schema_contact: [
          {
            name: "Tommy Aldershot",
            birthdate: "2000-10-10",
            client_id__c: "SBS-9628",
            infrm__referral_date__c: "2019-12-10",
            email: "tommy@gmail.com",
          },
        ],
      },
    },
  },
];

const mock_Action = [
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
                name: "A-040559",
                recordtype: {
                  name: "Counselling Action",
                },
                createddate: "2019-12-10T11:02:48",
                counsellor__c: "Paul Harris",
              },
            ],
          },
        ],
      },
    },
  },
];
const mock_actionDetail = [
  {
    request: {
      query: actionQuery,
      variables: { email: "abc@gmail.com" },
    },
    result: {
      data: {
        schema_infrm__action__c: [
          {
            complexity_factors__c: null,
            contextual_problems__c: null,
            core_score_stage__c: "Assessment",
            core_score__c: null,
            goal_progress__c: "2",
          },
        ],
      },
    },
  },
];

it("renders products", async () => {
  const { getByText, findByText, getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SupportPage email={"abc@gmail.com"} />
    </MockedProvider>
  );
  const element = getByTestId("loading");
  expect(element).toHaveTextContent("Loading");

  // const abc = await getByTestId("back-button");
  // expect(abc).toHaveTextContent("Support");
  // expect(findByText("hong kong")).toBeInTheDocument();

  // const producttag = await findByText("xy");
  // expect(producttag).toBeInTheDocument;
});

it("renders homepage", async () => {
  const { getByText, findByText, getByTestId } = render(
    <MockedProvider mocks={mock_personalInfo} addTypename={false}>
      <HomePage email={"abc@gmail.com"} />
    </MockedProvider>
  );
  const element = getByTestId("loading");
  expect(element).toHaveTextContent("Loading");
});

it("renders action", async () => {
  const { getByText, findByText, getByTestId } = render(
    <MockedProvider mocks={mock_Action} addTypename={false}>
      <Action email={"abc@gmail.com"} />
    </MockedProvider>
  );
  const element = getByTestId("loading");
  expect(element).toHaveTextContent("Loading");
});

// it("renders log out button in header", async () => {
//   const { getByText, findByText, getByTestId } = render(<Header />);
//   const element = getByTestId("logout-button");
//   expect(element).toHaveTextContent("Log");
// });

// it("renders menu button", async () => {
//   const { getByText, findByText, getByTestId } = render(<App />);
//   const element = getByTestId("button");
//   expect(element).toHaveTextContent("Personal");
// });

// it("renders actionDetail", async () => {
//   const { getByText, findByText, getByTestId } = render(
//     <MockedProvider mocks={mock_actionDetail} addTypename={false}>
//       <ActionDetail />
//     </MockedProvider>
//   );
//   const element = getByTestId("loading");
//   expect(element).toHaveTextContent("Loading");
// });
