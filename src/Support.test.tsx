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
                name: "PLAN-20780",
                recordtype: {
                  name: "Homeless Outcome Star Support Plan",
                },
                createddate: "2020-03-11T13:15:58",
                user_to_supportplan: {
                  name: "Ali Zia",
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

  const producttag = await findByText("Paul Harris");
  expect(producttag).toBeInTheDocument();
});
