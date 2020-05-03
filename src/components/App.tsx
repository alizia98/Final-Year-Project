import React from "react";
import "../styles/App.css";
import Header from "./header";
import Drawer from "@material-ui/core/Drawer";
import { useAuth0 } from "../auth/react-auth0-wrapper";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { CssBaseline, MenuList, MenuItem } from "@material-ui/core";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "../pages/Home";
import ActionPage from "../pages/Action";
import SupportPlan from "../pages/SupportPlan";
import SupportPage from "../pages/Support";
import { indigo } from "@material-ui/core/colors";
import ActionDetail from "../pages/ActionDetails";
import NavigationBar from "../pages/NavigationBar";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    nested: {
      padding: theme.spacing(3),
      // paddingBottom: theme.spacing(4),
      paddingLeft: theme.spacing(4),
      // paddingTop: theme.spacing(4)
    },
    IndigoButton: {
      padding: theme.spacing(3),
      // paddingBottom: theme.spacing(4),
      paddingLeft: theme.spacing(4),
      "&:hover": {
        backgroundColor: indigo[500],
        color: "#FFF",
      },
    },
  })
);

const createApolloClient = (authToken: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://ymj-hasura.herokuapp.com/v1/graphql",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
    cache: new InMemoryCache(),
  });
};

function App() {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    loading,
    token,
    user,
  } = useAuth0();

  // console.log(loginWithRedirect);

  const email = "tommy@gmail.com";
  // email = user.email;

  const classes = useStyles();

  // for apollo client
  const client = createApolloClient(token);
  if (!isAuthenticated || !user) {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className={classes.root}>
            <CssBaseline />
            <Header
              isAuthenticated={isAuthenticated}
              loginWithRedirect={loginWithRedirect}
              logout={logout}
              loading={loading}
            />
            Loading ...
          </div>
        </Router>
      </ApolloProvider>
      // <NavigationBar client={client} />
    );
  }

  // console.log(user.email);
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <Header
            isAuthenticated={isAuthenticated}
            loginWithRedirect={loginWithRedirect}
            logout={logout}
            loading={loading}
          />

          <NavigationBar />

          <main className={classes.content}>
            <Toolbar />
            <Switch>
              <Route exact={true} path="/">
                <HomePage email={email} />
              </Route>
              <Route exact={true} path="/action">
                <ActionPage email={email} />
              </Route>
              <Route exact={true} path="/support">
                <SupportPage email={email} />
              </Route>
              <Route path="/support/:supportId">
                <SupportPlan />
              </Route>
              <Route path="/action/:actionId">
                <ActionDetail />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
