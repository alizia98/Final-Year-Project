import React from "react";
import { render, cleanup } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import SupportPage, { supportQuery } from "../pages/Support";
import SupportPlan, { supportPlanQuery } from "../pages/SupportPlan";
import { gql } from "apollo-boost";
import HomePage, { personalInfoquery } from "../pages/Home";
import Action, { actionQuery } from "../pages/Action";
import App from "../components/App";
import "@testing-library/jest-dom/extend-expect";
import ActionDetail, { actionDetailquery } from "../pages/ActionDetails";
import Header from "../components/header";
import waait from "waait";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

afterEach(cleanup);

const mocks = [
  {
    request: {
      query: supportPlanQuery,
      variables: { supportId: "plan-123" },
    },
    result: {
      data: {
        schema_contact: [
          {
            infrm__supportplan__cs: [
              {
                action_set_as1__c: "Test Test Test Test Test",
                action_set_as2__c: "Test Test Test Test Test",
                action_set_as3__c: "Test Test Test Test Test",
                action_set_as4__c: "Test Test Test Test Test",
                action_set_as5__c: "Test Test Test Test Test",
                to_be_completed_by_as1__c: "2019-12-10",
                to_be_completed_by_as2__c: "2019-12-10",
                to_be_completed_by_as3__c: "2019-12-10",
                to_be_completed_by_as4__c: "2019-12-10",
                to_be_completed_by_as5__c: "2019-12-10",
                actual_date_of_completion_as1__c: "2019-12-10",
                actual_date_of_completion_as2__c: "2019-12-10",
                actual_date_of_completion_as3__c: "2019-12-10",
                actual_date_of_completion_as4__c: "2019-12-10",
                actual_date_of_completion_as5__c: "2019-12-10",
                not_completed_as1__c: false,
                not_completed_as2__c: false,
                not_completed_as3__c: false,
                not_completed_as4__c: false,
                not_completed_as5__c: false,
                no_longer_relevant_as1__c: false,
                no_longer_relevant_as2__c: false,
                no_longer_relevant_as3__c: false,
                no_longer_relevant_as4__c: false,
                no_longer_relevant_as5__c: false,
                name: "plan-123",
                infrm__x1_motivation_taking_responsibility_staf__c: null,
                infrm__x2_self_care_living_skills_staff__c: null,
                infrm__x3_managing_money_staff__c: null,
                infrm__x4_social_networks_relationships_staff__c: null,
                infrm__x5_score5_drug_alcohol_misuse_staff__c: null,
                infrm__x6_physical_health_staff__c: null,
                infrm__x7_emotional_mental_health_staff__c: null,
                infrm__x8_meaningful_use_time_staff__c: null,
                infrm__x9_managing_tenancy_accommodation_staff__c: null,
                infrm__x10_offending_staff__c: null,
                infrm__priority_area__c: null,
                infrm__priority_area_1_action__c: null,
                infrm__priority_area_1_target_date__c: null,
                infrm__priority_area_1_completed_date__c: null,
                infrm__priority_1_was_it_done__c: null,
                infrm__priority_area_1_who__c: null,
                infrm__priority_area_2__c: null,
                infrm__priority_area_2_action__c: null,
                infrm__priority_area_2_by_who__c: null,
                infrm__priority_area_2_completed_date__c: null,
                infrm__priority_area_2_target_date__c: null,
                infrm__priority_2_action_was_it_done__c: null,
                infrm__priority_area_3__c: null,
                infrm__priority_area_3_action__c: null,
                infrm__priority_area_3_by_who__c: null,
                infrm__priority_area_3_completed_date__c: null,
                infrm__priority_area_3_target_date__c: null,
                infrm__pr__c: null,
                infrm__priority_area_4__c: null,
                infrm__priority_area_4_action__c: null,
                infrm__priority_area_4_by_who__c: null,
                infrm__priority_area_4_completed_date__c: null,
                infrm__priority_area_4_target_date__c: null,
                infrm__priority_4_action_was_it_done__c: null,
              },
            ],
          },
        ],
      },
    },
  },
];

it("renders loading in SupportPlan", async () => {
  const route = "/support/plan-123";
  const history = createMemoryHistory({ initialEntries: [route] });
  const { getByTestId, debug } = render(
    <Router history={history}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Route path="/support/:supportId">
          <SupportPlan />
        </Route>
      </MockedProvider>
    </Router>
  );
  // debug();
  const element = getByTestId("loading");
  expect(element).toHaveTextContent("Loading");
});

it("renders SupportPlan when loaded ", async () => {
  const route = "/support/plan-123";
  const history = createMemoryHistory({ initialEntries: [route] });
  const { getByTestId } = render(
    <Router history={history}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Route path="/support/:supportId">
          <SupportPlan />
        </Route>
      </MockedProvider>
    </Router>
  );

  await waait(0);

  const element = getByTestId("text-content");
  expect(element).toHaveTextContent("plan-123");
});
