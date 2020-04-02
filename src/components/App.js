import React, { useState } from "react";
import "../styles/App.css";
import Header from "./header.js";
import NewPost from "./NewPost";
// import SecuredRoute from "./SecuredRoute";


// for apollo client
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";

function App() {

  // for apollo client
  const httpLink = new HttpLink({
    uri: "https://ymj-hasura.herokuapp.com/v1/graphql"
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
           <Header />
    </ApolloProvider>
  );
}

export default App;