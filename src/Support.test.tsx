import React from "react";
import { render, cleanup } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import SupportPage from "./pages/Support";
import { gql } from "apollo-boost";

afterEach(cleanup);

const mocks = [
  {
    request: {
      query: gql`
        query MyQuery($email: String!) {
          schema_contact(where: { email: { _eq: $email } }) {
            infrm__supportplan__cs {
              name
              recordtype {
                name
              }
              createddate
              user_to_supportplan {
                name
              }
            }
          }
        }
      `,
      variables: { email: String },
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

it("renders products", async () => {
  const { getByText, findByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SupportPage email={""} />
    </MockedProvider>
  );
  expect(getByText("Loading...")).toBeInTheDocument();

  const producttag = await findByText("xyz");
  expect(producttag).toBeInTheDocument();
});
