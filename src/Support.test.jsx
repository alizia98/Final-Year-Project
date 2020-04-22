import React from "react";
import { render, cleanup } from "react-testing-library";
import { MockedProvider, MockedResponse } from "react-apollo/test-utils";
import { Router, Switch } from "react-router-dom";
import { createMemoryHistory } from "history";
import "jest-dom/extend-expect";
import SupportPage from "pages/Support";

afterEach(cleanup);

it("renders products", async () => {
  const {} = render(
    <MockedProvider>
      <SupportPage />
    </MockedProvider>
  );
});
