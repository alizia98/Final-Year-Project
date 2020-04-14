import React from "react";
import "../styles/App.css";
import Header from "./header";
import Drawer from "@material-ui/core/Drawer";
import { useAuth0 } from "../auth/react-auth0-wrapper";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
// for apollo client
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { CssBaseline, MenuList, MenuItem } from "@material-ui/core";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "../pages/Home";
import ActionPage from "../pages/Action";
import MapsPage from "../pages/Maps";
import SupportPlan from "../pages/SupportPlan";
import SupportPage from "../pages/Support";
import { useLocation } from "react-router-dom";
import { indigo } from "@material-ui/core/colors";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerContainer: {
      overflow: "auto"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    nested: {
      padding: theme.spacing(3),
      // paddingBottom: theme.spacing(4),
      paddingLeft: theme.spacing(4)
      // paddingTop: theme.spacing(4)
    },
    IndigoButton: {
      padding: theme.spacing(3),
      // paddingBottom: theme.spacing(4),
      paddingLeft: theme.spacing(4),
      "&:hover": {
        backgroundColor: indigo[500],
        color: "#FFF"
      }
    }
  })
);

const createApolloClient = (authToken: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://ymj-hasura.herokuapp.com/v1/graphql",
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }),
    cache: new InMemoryCache()
  });
};

function App() {
  const { isAuthenticated, token } = useAuth0();
  const classes = useStyles();
  console.log({ token });
  const location = useLocation();

  // for apollo client
  const client = createApolloClient(token);
  // console.log(location);
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <Header />

          {isAuthenticated && (
            <>
              <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                  paper: classes.drawerPaper
                }}
              >
                <Toolbar />
                <div className={classes.drawerContainer}>
                  <MenuList>
                    <MenuItem
                      className={classes.IndigoButton}
                      selected={"/" === location.pathname}
                      component={Link}
                      to="/"
                    >
                      Personal Info
                    </MenuItem>
                    <MenuItem
                      selected={"/support" === location.pathname}
                      className={classes.IndigoButton}
                      component={Link}
                      to="/support"
                    >
                      Support Plan
                    </MenuItem>
                    <MenuItem
                      selected={"/action" === location.pathname}
                      className={classes.IndigoButton}
                      component={Link}
                      to="/action"
                    >
                      Action Plan
                    </MenuItem>
                    <MenuItem
                      selected={"/maps" === location.pathname}
                      className={classes.IndigoButton}
                      component={Link}
                      to="/maps"
                    >
                      Maps
                    </MenuItem>
                  </MenuList>
                </div>
              </Drawer>

              <main className={classes.content}>
                <Toolbar />
                <Switch>
                  <Route exact={true} path="/">
                    <HomePage />
                  </Route>
                  <Route path="/action">
                    <ActionPage />
                  </Route>
                  <Route exact={true} path="/support">
                    <SupportPage />
                  </Route>

                  <Route path="/maps">
                    <MapsPage />
                  </Route>
                  <Route path="/support/:supportId">
                    <SupportPlan />
                  </Route>
                </Switch>
              </main>
            </>
          )}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
